const fs = require('fs');
const path = require('path');

class CustomReporter {
	constructor() {
		// Match Playwright's JSON reporter structure exactly
		this.report = {
			config: {},
			suites: [],
			errors: [],
			stats: {
				startTime: new Date().toISOString(),
				duration: 0,
				expected: 0,
				skipped: 0,
				unexpected: 0,
				flaky: 0
			}
		};
	}

	onBegin(config, suite) {
		this.report.config = {
			configFile: config.configFile,
			rootDir: config.rootDir,
			forbidOnly: config.forbidOnly,
			fullyParallel: config.fullyParallel,
			globalSetup: config.globalSetup,
			globalTeardown: config.globalTeardown,
			globalTimeout: config.globalTimeout,
			grep: config.grep,
			grepInvert: config.grepInvert,
			maxFailures: config.maxFailures,
			metadata: config.metadata,
			preserveOutput: config.preserveOutput,
			reporter: config.reporter,
			reportSlowTests: config.reportSlowTests,
			quiet: config.quiet,
			projects: config.projects.map(project => ({
				name: project.name,
				outputDir: project.outputDir,
				repeatEach: project.repeatEach,
				retries: project.retries,
				testDir: project.testDir,
				testIgnore: project.testIgnore,
				testMatch: project.testMatch,
				timeout: project.timeout
			}))
		};
		console.log('Starting the test suite...');
	}

	onTestBegin(test) {
		console.log(`Test Case Started: ${test.title}`);
	}

	onTestEnd(test, result) {
		// Exactly match Playwright's test result structure
		const testResult = {
			annotations: test.annotations,
			expectedStatus: test.expectedStatus,
			projectName: test.projectName,
			projectId: test.projectId,
			results: [{
				ancestorTitles: test.parent.titlePath(),
				duration: result.duration,
				error: result.error,
				retry: result.retry,
				startTime: result.startTime,
				status: result.status,
				stderr: result.stderr,
				stdout: result.stdout,
				steps: result.steps,
				attachments: result.attachments?.map(attachment => ({
					name: attachment.name,
					contentType: attachment.contentType,
					path: attachment.path,
					body: attachment.body
				}))
			}],
			status: result.status,
			tags: test.tags,
			title: test.title,
			titlePath: () => test.titlePath()
		};

		// Find or create suite structure
		let currentSuite = this.report.suites;
		for (const title of test.parent.titlePath()) {
			let suite = currentSuite.find(s => s.title === title);
			if (!suite) {
				suite = {
					title,
					specs: [],
					suites: []
				};
				currentSuite.push(suite);
			}
			currentSuite = suite.suites;
		}

		// Add test to the deepest suite
		const deepestSuite = this.report.suites;
		deepestSuite.specs = deepestSuite.specs || [];
		deepestSuite.specs.push(testResult);

		// Update stats
		if (result.status === 'skipped') this.report.stats.skipped++;
		else if (result.status === test.expectedStatus) this.report.stats.expected++;
		else this.report.stats.unexpected++;
		if (result.retry > 0) this.report.stats.flaky++;
	}

	onStepBegin(test, result, step) {
		if (step.category === 'test.step') {
			console.log(`Executing Step: ${step.title}`);
		}
	}

	onError(error) {
		this.report.errors.push({
			message: error.message,
			stack: error.stack,
			value: error.value
		});
		console.log(error.message);
	}

	async onEnd(result) {
		this.report.stats.duration = result.duration;
		this.report.stats.endTime = new Date().toISOString();

		// Generate report directory
		const reportDir = path.join(process.cwd(), 'test-report');
		if (!fs.existsSync(reportDir)) {
			fs.mkdirSync(reportDir, { recursive: true });
		}

		// Write report in exact Playwright JSON format
		const reportPath = path.join(reportDir, 'custom-playwright-report.json');
		try {
			fs.writeFileSync(reportPath, JSON.stringify(this.report, null, 2));
			console.log(`Test report generated: ${reportPath}`);
		} catch (error) {
			console.error(`Failed to write test report: ${error.message}`);
		}

		// Log final stats
		console.log('Test suite finished. Report generated.');
		console.log(`Expected: ${this.report.stats.expected}`);
		console.log(`Unexpected: ${this.report.stats.unexpected}`);
		console.log(`Flaky: ${this.report.stats.flaky}`);
		console.log(`Skipped: ${this.report.stats.skipped}`);
	}
}

module.exports = CustomReporter;
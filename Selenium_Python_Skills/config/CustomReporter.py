import json
import os
from datetime import datetime, timezone
from pathlib import Path


class CustomReporter:
    """Collect pytest execution events into a compact JSON report.

    Use from pytest hooks in conftest.py:

        reporter = CustomReporter()

        def pytest_runtest_logreport(report):
            reporter.record_report(report)

        def pytest_sessionfinish(session, exitstatus):
            reporter.write(exitstatus)
    """

    def __init__(self, report_dir="test-report", report_name="custom-selenium-report.json"):
        self.report_dir = Path(report_dir)
        self.report_name = report_name
        self.report = {
            "config": {},
            "suites": [],
            "errors": [],
            "stats": {
                "startTime": datetime.now(timezone.utc).isoformat(),
                "duration": 0,
                "expected": 0,
                "skipped": 0,
                "unexpected": 0,
                "flaky": 0
            }
        }

    def configure(self, config):
        self.report["config"] = {
            "rootDir": str(getattr(config, "rootpath", "")),
            "testpaths": config.getini("testpaths") if hasattr(config, "getini") else [],
            "markers": config.getini("markers") if hasattr(config, "getini") else [],
            "browser": config.getoption("--browser", default=os.getenv("BROWSER", "chrome")) if hasattr(config, "getoption") else os.getenv("BROWSER", "chrome"),
            "headless": config.getoption("--headless", default=os.getenv("HEADLESS", "false")) if hasattr(config, "getoption") else os.getenv("HEADLESS", "false")
        }

    def record_report(self, pytest_report):
        if pytest_report.when != "call":
            return

        status = "passed" if pytest_report.passed else "failed" if pytest_report.failed else "skipped"
        item = {
            "nodeid": pytest_report.nodeid,
            "title": pytest_report.nodeid.split("::")[-1],
            "status": status,
            "duration": pytest_report.duration,
            "keywords": sorted([str(key) for key in getattr(pytest_report, "keywords", [])]),
            "longrepr": str(pytest_report.longrepr) if pytest_report.failed else None
        }

        suite_name = pytest_report.nodeid.split("::")[0]
        suite = self._get_or_create_suite(suite_name)
        suite["tests"].append(item)

        if pytest_report.skipped:
            self.report["stats"]["skipped"] += 1
        elif pytest_report.passed:
            self.report["stats"]["expected"] += 1
        else:
            self.report["stats"]["unexpected"] += 1

    def record_error(self, error):
        self.report["errors"].append({
            "message": str(error),
            "type": error.__class__.__name__
        })

    def write(self, exitstatus=0):
        start = datetime.fromisoformat(self.report["stats"]["startTime"])
        end = datetime.now(timezone.utc)
        self.report["stats"]["endTime"] = end.isoformat()
        self.report["stats"]["duration"] = (end - start).total_seconds()
        self.report["exitstatus"] = exitstatus

        self.report_dir.mkdir(parents=True, exist_ok=True)
        report_path = self.report_dir / self.report_name
        report_path.write_text(json.dumps(self.report, indent=2), encoding="utf-8")
        return str(report_path)

    def _get_or_create_suite(self, suite_name):
        for suite in self.report["suites"]:
            if suite["title"] == suite_name:
                return suite

        suite = {
            "title": suite_name,
            "tests": []
        }
        self.report["suites"].append(suite)
        return suite

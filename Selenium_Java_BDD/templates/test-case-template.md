# Test Case → Gherkin Mapping Template

Use this template when converting ADO/Jira test cases into BDD scenarios.

---

## ADO Test Case Structure → Gherkin Mapping

| ADO Field              | Maps To                          |
|------------------------|----------------------------------|
| Test Case Title        | Scenario name                    |
| Test Case ID           | @TC-XXX-NNN tag                  |
| Module / Feature Area  | Feature name + @featureName tag  |
| Priority (P1/P2)       | @smoke (P1) / @regression (P2+)  |
| Preconditions          | Background steps                 |
| Test Steps             | Given / When steps               |
| Expected Results       | Then steps                       |
| Test Data              | Examples table (Scenario Outline)|

---

## Template: Single Happy Path Scenario

```gherkin
@smoke @leaveManagement @TC-LM-001
Scenario: Admin can apply for annual leave successfully
  Given the admin is on the Leave Management page
  When the admin selects leave type as "Annual Leave"
  And the admin enters start date as "2025-08-01" and end date as "2025-08-05"
  And the admin submits the leave request
  Then the leave request is submitted successfully
  And the leave balance is updated accordingly
```

---

## Template: Negative / Validation Scenario

```gherkin
@regression @leaveManagement @TC-LM-002
Scenario: Leave request fails when dates overlap existing approved leave
  Given the admin is on the Leave Management page
  When the admin submits a leave request with overlapping dates
  Then an error message "Leave dates overlap with existing leave" is displayed
```

---

## Template: Data-Driven Scenario Outline

```gherkin
@regression @leaveManagement @TC-LM-003
Scenario Outline: Leave request validation for different leave types
  Given the admin is on the Leave Management page
  When the admin applies for "<leaveType>" from "<startDate>" to "<endDate>"
  Then the request status should be "<expectedStatus>"

  Examples:
    | leaveType    | startDate  | endDate    | expectedStatus |
    | Annual Leave | 2025-08-01 | 2025-08-03 | Pending        |
    | Sick Leave   | 2025-08-05 | 2025-08-06 | Pending        |
    | Unpaid Leave | 2025-08-10 | 2025-08-10 | Pending        |
```

---

## Template: Feature with Background

```gherkin
Feature: Leave Management
  As an Admin
  I want to manage employee leave requests
  So that leave balances are tracked accurately

  Background:
    Given the admin is logged in with role "Admin"
    And the admin navigates to Leave Management

  @smoke @leaveManagement @TC-LM-001
  Scenario: Admin can view leave requests list
    Then the leave requests list is displayed with at least 1 record

  @regression @leaveManagement @TC-LM-004
  Scenario: Admin can filter leave requests by status
    When the admin filters leave requests by status "Pending"
    Then only "Pending" leave requests are displayed
```

---

## Step Naming Conventions

| Type  | Pattern                                      | Example                                        |
|-------|----------------------------------------------|------------------------------------------------|
| Given | `the {role} is logged in with role "{role}"` | `the admin is logged in with role "Admin"`     |
| Given | `the {role} is on the {page} page`           | `the admin is on the Leave Management page`    |
| When  | `the {role} {verb} {noun}`                   | `the admin submits the leave request`          |
| When  | `the {role} enters {field} as "{value}"`     | `the admin enters start date as "2025-08-01"`  |
| Then  | `the {noun} {state verb}`                    | `the leave request is submitted successfully`  |
| Then  | `{error/success message} is displayed`       | `an error message "..." is displayed`          |

# features/bank-account.feature


Feature: Test Case example

  Scenario: Send a Post request with valid credentials then check its status
    When I give username and password
    Then I should see Status 200

  Scenario: Send a Post request with 2 valid int I should receive the sum of them
    When I give 2 ints
    Then I should receive the sum

  Scenario: Send a Post request with 2 invalid int and I should receive null as result
    When I give 2 invalid ints
    Then I should receive null as result

  Scenario: Send a Post request with invalid password then check its status
    When I give username and invalid password
    Then I should see Status 401

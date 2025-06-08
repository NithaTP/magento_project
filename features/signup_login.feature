Feature: User Account Creation and Login on Magento Demo Site

  Background:
    Given I am on the Magento homepage

  @signup-login
  Scenario: Create a new user and log in with same credentials
    When I navigate to the "Create an Account" page
    And I enter valid registration details:
      | FirstName | LastName | Email | Password |
      | Nitha     | Paul     | auto  | N1tha100 |
    And I submit the registration form
    And I should see a welcome message containing "Nitha"
    And I log out
    When I navigate to the "Sign In" page
    And I login with:
      | Email | Password |
      | auto  | N1tha100 |
    Then I should see "Nitha" in the dashboard
    And I should see a welcome message containing "Nitha"

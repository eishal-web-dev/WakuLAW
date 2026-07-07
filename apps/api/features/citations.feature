Feature: Citation extraction
  As a legal researcher
  I want statutes, articles, and case citations detected in a document
  So that I can jump to the legal authorities a judgment relies on

  Background:
    Given a registered user with an authenticated session

  Scenario: Statute, constitution, and case-law citations are detected
    Given the user uploaded a judgment citing "Section 302(b) of the Pakistan Penal Code", "Article 4 of the Constitution" and "2009 SCMR 230"
    When the user requests the document citations
    Then a statute citation "Section 302(b)" is found
    And a constitution citation "Article 4" is found
    And a case-law citation "2009 SCMR 230" is found
    And every citation includes the sentence it appears in

  Scenario: Duplicate citations are reported once
    Given the user uploaded a document citing "Section 302" twice
    When the user requests the document citations
    Then the citation list contains exactly one entry for "Section 302"

  Scenario: Document without citations yields an empty list
    Given the user uploaded a document containing no citations
    When the user requests the document citations
    Then the citation list is empty

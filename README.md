# Airplane Take Home Assignment

## Problem Statement
Let's pretend that we're working with a prospective customer, and we'd like to build a proof of concept demonstrating how Airplane can work for a moderation use case:

* This company runs a blog, and their users leave comments on articles. They have a relational database with a comments table that stores these comments.
* They sometimes get spam and other abusive messages in comments, so as a result they have an internal team that reads and approves all comments before they're shown on the website.
* They'd like to use Airplane to build some simple tooling for their team. Each member of the team would open Airplane, see comments assigned to them, and manually approve comments. Only approved comments would then appear in the app.

## High Level Architecture
* Supabase database of list of comments was created to represent the blog's relational database and a task was created to pull data from this resource.
* All other data was stored in Airtable to keep it separate from main database. List of employees and comments assigned to employees are stored in Airtable.
* The task list of employees was created to pull data from the Airtable and display it in an airplane view.
* The task comments assigned to employees was also created to display the employees comments assigned in the view. 
* Approve and Flag comments tasks were built to update the comment status as "approved' or 'flagged' when the employee clicked on the approve and flag buttons. 
* A dashboard was created to allow employees to click on their names and see which comments are assigned to them. From there they can either approve or flag a comment and the comment status will be updated. 

## How It Solves Customer's Problems
The airplane tasks and view allow employees to select their name and see which comments are assigned to them. They can then decide which comments to approve and which ones to flag. This allows employees to immediately read and mark comments on the same platform, rather than searching for comments assigned to them and going to another page to approve or flag. It streamlines the process for employees, thereby, cutting time and improving productivity. 

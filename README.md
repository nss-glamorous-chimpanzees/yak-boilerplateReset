# Yak Social Network

## 1: NavBar

### Story

In order to quickly access common features of Yak, I should see them at the top of the page in a navigation element.

### Acceptance Criteria

**Given** a user has authenticated  
**When** the user is viewing any aspect of Yak  
**Then** a navigation bar should be visible at the top of the application with the following sub-components

* Home
* Search friends / messages / posts
* Profile
* Log out/in
* Notifications
  * Friends' events you were invited to
  * Likes of your posts
  * Friend invites

> Note: Use the React Router Dom npm package

___

## 2: Register Account

### Story

In order to use Yak, I need to register a new account

### Acceptance Criteria

**Given** a person want to use Yak Social Network  
**When** they first visit the application  
**Then** a registration form should be displayed with the following fields

* Email
* First name
* Last name
* Location

> Technical note: For MVP, simply store the user's information as plaintext in your API. Once MVP is complete, you may use Auth0 for user management

___

## 3: Login

### Story

In order to use the Yak Social Network, a person should be able to provide authentication credentials to access their data

### Acceptance Criteria

**Given** a person has created a Yak account  
**When** they are unauthenticated  
**And** visit the Yak domain  
**Then** the user should be presented with a login screen with the following fields

* Email
* Password
* Remember me checkbox

**Given** the user has filled out the login form with valid credentials  
**When** the user performs a gesture on the Login affordance  
**Then** the user should be presented with the Yak interface

**Given** the user has filled out the login form with invalid credentials  
**When** the user performs a gesture on the Login affordance  
**Then** the user should be presented with a message that their credentials are incorrect

**Given** the user has filled out the login form with valid credentials  
**And** checked the Remember Me affordance  
**When** the user performs a gesture on the Login affordance  
**Then** the user should be presented with the Yak interface  
**And** on a subsequent visit to the Yak application, the user should not have to log in again

___

## 4: Create Post

### Story

In order to share information with other users of Yak, I need to be able to create a post with text and/or images

### Acceptance Criteria

**Given** a user has authenticated  
**When** the application loads  
**Then** the user should see a text area in which to enter the post content  
**And** a Publish affordance should be available to share the post

**Given** the user has entered in text for a post  
**When** the user performs a gesture on the Publish affordance  
**Then** the post should appear in the public feed of all other users who follow the current user  
**And** it should appear in the feed of the current user  
**And** the current user should see an Edit affordance  
**And** the current user should see a Delete affordance  

**Given** the user wants to add an image to a post  
**When** the user drops an image into their post  
**And** the user performs a gesture on the Publish affordance  
**Then** the image should be saved and appear along with the post in all relevant feeds

**Given** the user wants to delete a published post  
**When** the user performs a gesture on the Delete affordance  
**Then** the post should be removed from all feeds

**Given** the user wants to edit a post  
**When** the user performs a gesture on the Edit affordance  
**Then** the post content should appear in an editable text area  
**And** an Update affordance should appear beneath the editable area

**Given** the user has edited a post  
**When** the user performs a gesture on the Update affordance  
**Then** the post content should update in all relevant feeds

___

## 6: Feed Component

### Story

In order to know what is going on with my friends, and other people on the social network, I should see a feed of public posts from all users, and private posts from my friends.

### Acceptance Criteria

**Given** a user wants to catch up with what people are doing  
**When** the user authenticates  
**Then** a list of posts, sorted by date descending, should be presented to the user  
**And** the list should include all public posts by all users  
**And** the list should include any private posts from the user's friends  

___

## 7: Add Friend

### Story

In order to send private messages to another user, I need to establish a friend relationship with that user

### Acceptance Criteria

**Given** a user is viewing another person's profile page  
**When** the user performs a gesture on the Add Friend afforance  
**Then** a notification should be sent to the other user that the current user is requesting a connection

**Given** the user has sent another user a friend request  
**When** the other user accepts the friend request  
**Then** the current user should see all public and private posts by the friend

**Given** the user has sent another user a friend request  
**When** the other user rejects the friend request  
**Then** the current user should receive a notification that the request was denied

___

## 11: Friends List Component

### Story

In order to manage my friends, I need to be able to see a list of all people I am currently friends with, and remove friends if I need to.

### Acceptance Criteria

**Given** the user has authenticated  
**When** the user views the dashboard  
**Then** the user should see a list of their friends  
**And** each friend should have a Remove affordance

**Given** the user has a list of friends  
**When** the user performs a gesture on the Remove affordance  
**Then** the relationship between the users should be deleted  
**And** the other user should no longer show up in the friends list

___

## 15: Profile Component

### Story

In order to follow another person on the Yak Social Network, or to request a person to become a friend, a user should be able to view the profile of another person

### Acceptance Criteria

**Given** a user wants to follow another person in order to view their posts  
**When** the user types in the other person's name in the search component  
**Then** the user should be presented with a list of matching names

**Given** the user has performed a search for another user to follow  
**And** they are viewing the matching results  
**When** the user clicks on one of the people in the results  
**Then** the user should be presented with the other person's profile page that contains the following information

* Profile picture
* Person's full name
* Last 5 posts from user (if applicable)
* Person's location
* A Follow affordance
* An Add Friend affordance

**Given** the user has authenticated  
**When** the user visits their own profile page by performing a gesture on the Profile affordance in the navigation bar  
**Then** the user should be presented with their profile page that contains the following information

* Profile picture
* Person's full name
* Person's location
* A Change Theme affordance
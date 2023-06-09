# bvt-clockify-client

This is the client portion of a fullstack web app created for BVT to help automate the process of converting clockify export CSV's into a master CSV that contains all students in a project and their hours.

# Steps to use this project

Step 1: Change the url in the api folder to be whatever URL you use (localhost, onrender, vercel, firebase etc)

# Steps to generate a CSV

Step 1: Upload a Member CSV. This file contains all of the memebers of the cohort and should be a CSV of the following format:

Name,Project Lynda Oman,Bay Valley Tech Work Fredra Tozer,Bay Valley Tech Work

etc

Step 2: Upload the clockify hours export CSV. THis file contains the clockify entries for the week and should be a CSV of the following format:

Project,Client,User,Time Bay Valley Tech Work,(Without client),Lynda Oman,20:05:33 Bay Valley Tech Work,(Without client),Fredra Tozer,7:15:00

etc

The name of the file should remain unchanged as it is imported from clockify, so that the server can get the date from the file name

Step 3: Select the projects you want to be on the master CSV and generate the CSV on the server

Step 4: Once the file is ready, you can click the download CSV button to download the generated CSV

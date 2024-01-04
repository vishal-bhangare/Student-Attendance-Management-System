
# Attendance Management System


I have build this project to :
- Schedule lectures
- Manage attendance of students
- Manage leaves
- Organize data of students and facutly.

## DEMO VIDEO



https://github.com/vishal-bhangare/studpunch/assets/61643919/ce4ae8f3-9e61-4315-b250-b14039763c44



Your are free to use this project.

## Usage

### View project live -
[project-ams.rf.gd](https://project-ams.rf.gd/)
## Source code

If you want to do update in project you can download project folder from repo.

## Database Structure

#### Admins table
|Column|Data type|
|------|--------|
|id	| int(11) Auto Increment	|
|username	| varchar(100)	|
|password	| varchar(50)|

#### Faculty table
|Column|Data type|
|------|--------|
|id	| int(11) Auto Increment	
|name	| varchar(100)	
|dob	| date	
|email	| varchar(50)	
|contact	| bigint(20)	
|address	| varchar(200)	
|department	| varchar(30)	
|designation	| varchar(50)	
|password	| varchar(50)

#### Students table
|Column|Data type|
|------|--------|
|id|	int(11) Auto Increment	|
|name	| varchar(200)	|
|class	| varchar(50)	|
|division	| varchar(10)	|
|rollno	|int(11)	|
|dob	| date	|
|contact	| bigint(20)	|
|email	| varchar(50)|	
|address	| varchar(200)|	
|password	| varchar(50)|

#### Departments table
|Column|Data type|
|------|--------|
|id	| int(11) Auto Increment	|
|academic_year	| varchar(10)	|
|class_name	| varchar(50)	|
|timestamp	| varchar(50)|
|lecture_id	| int(11)	|
|subject_code	| varchar(20)	|
|faculty_id	| int(11)	|
|student_id	| int(11)	|
|remark	| varchar(1)|

#### Attendance table
|Column|Data type|
|------|--------|
|id	| int(11) Auto Increment	|
|academic_year	| varchar(10)	|
|class_name	| varchar(50)	|
|timestamp	| varchar(50)	|
|lecture_id	| int(11)	|
|subject_code	| varchar(20)	|
|faculty_id	| int(11)	|
|student_id	| int(11)	|
|remark	| varchar(1)|

#### Schedule table
|Column|Data type|
|------|--------|
|id	| int(11) Auto Increment	|
|class	| varchar(50)	|
|day	| varchar(20)	|
|from_time	| time	|
|to_time	| time	|
|subject	| varchar(50)	|
|faculty	| varchar(50) NULL|

#### Leaves table
|Column|Data type|
|------|--------|
|id	| int(11) Auto Increment	|
|application_date	| date	|
|student_id	| int(11)	|
|student_name	| varchar(100)	|
|student_class	| varchar(50)	|
|student_rollno	| int(11)	|
|student_div	| varchar(1)	|
|from_date	| varchar(15)	|
|to_date	| varchar(15)	|
|reason_subject	| varchar(150)	|
|reason_body	| varchar(500)	|
|attachment	| varchar(16)	|
|status	| int(1)|

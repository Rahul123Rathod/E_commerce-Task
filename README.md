# E-commerce Task

This repository contains a full-stack E-commerce project with a Django backend and a React frontend.

# Project Overview
The project is a complete E-commerce application that allows users to browse, filter, and purchase products online. It demonstrates full-stack development with a
clear separation of frontend and backend,API integration, and basic authentication.

# Tech Stack
- Backend:** Django, Django REST Framework, MySQL
- Frontend:** React, Vite
- Other Tools:** Axios (for API calls), Git (version control)

#  Backend (Django + DRF + MySQL)

# Setup

# Go to backend folder
cd e_commerce
# Create virtual environment
python -m venv .venv
# Activate venv
source .venv/bin/activate        # Linux / Mac
.\.venv\Scripts\activate         # Windows
# Upgrade pip
python -m pip install --upgrade pip
# Install dependencies
pip install -r requirements.txt
# Copy environment file
cp .env.example .env             # update DB credentials 
# Apply migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
# Run development server
python manage.py runserver

# Backend Dependencies (requirements.txt)
graphql
Django>=5.0
djangorestframework
mysqlclient           # MySQL database connector
django-cors-headers   # Handle CORS with frontend
python-dotenv         # Manage environment variables
# Useful Backend Commands
python manage.py makemigrations   # create migrations
python manage.py migrate          # apply migrations
python manage.py createsuperuser  # create admin user
python manage.py runserver        # run local server




# FRONTEND SETUP

cd frontend

# Install dependencies
react ^19.1.1
react-dom ^19.1.1
react-router-dom ^7.8.1 (for routing)
axios ^1.11.0 (for API calls)
tailwindcss ^4.1.12 (for styling)
web-vitals ^2.1.4 (performance metrics)

# Start development server
npx run dev

# Dev Testing Dependencies

react-scripts (CRA build & dev server)
testing-library/react
testing-library/jest-dom
testing-library/dom
testing-library/user-event



# Folder Structure
- e_commerce/ — Django backend code, including models, APIs, and database integration.
- frontend/ — React frontend code with components, pages, and API integration.

# Notes

Start backend first (python manage.py runserver)

Then start frontend (npm start)

Ensure MySQL server is running before migrations

Update .env files with correct credentials



# Advanced E-Commerce Platform

A full-stack e-commerce web application built using React, Node.js, Express, and MySQL (XAMPP).

## Features

### User Features

* User registration and login
* OTP verification
* Browse products
* View product details
* Add to cart
* Manage user profile
* Flash deals section
* Trending products



## Technology Stack

### Frontend

* React.js
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MySQL (XAMPP)
* PHPMyAdmin (database management)
* JWT Authentication

## Project Structure

```
Ecommerce/
├── backend/
├── frontend/
├── README.md
```

## Database Setup (XAMPP)

1. Start **Apache** and **MySQL** in XAMPP
2. Open `http://localhost/phpmyadmin`
3. Create database:

   ```
   ecommerce
   ```
4. Import SQL file (if available) or create tables manually

## Installation

### Clone Repository

```bash
git clone https://github.com/slxxssn/BIT3208-ADVANCED-WEB-DESIGN-AND-DEVELOPMENT.git
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Environment Variables

Create `.env` in backend:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce
JWT_SECRET=your_secret_key
```


## Author

Salax Hussein

## License

Educational project for learning full-stack development.

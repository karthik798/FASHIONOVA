# FASHIONOVA

> [!NOTE]  
> The project is deployed on Render's free plan, causing initial load delays as the node sleeps during inactivity. This is due to the free plan's dormancy feature.

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server

```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

johndoe@example.com (Customer)
123456

janedoe@example.com (Customer)
123456
```

### PayPal Dummy Account

```
Email : sb-l0d7a21644483@personal.example.com

Password : ;O/$.m7X

```

---

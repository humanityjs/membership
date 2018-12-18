# Membership API

### Membership API allows you to add members and assign a subscription/plan to members

# Setup

- Copy the `.env.sample` file and rename it `.env`
- Replace the content of `.env` with your own variables
- Specify a port (Optional)


# EndPoints
All endpoints are prefixed with `/api/v1`

- `POST /users` 
- `PUT /users`
- `DELETE /users`
- `GET /users`
- `GET /users/:id` - Gets a particular user.
- `POST /plans`
- `POST /plans/:id/add/:userID` - Adds a plan to a user
- `GET /plans/:id` - Gets all members on a plan
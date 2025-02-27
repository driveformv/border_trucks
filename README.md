# Border International

Border International's website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design
- Vehicle inventory management
- Service scheduling
- Parts ordering system
- Career opportunities
- Contact forms

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Make sure to set up the following environment variables:
- `RESEND_API_KEY`: API key for email service
- `TO_EMAIL`: Recipient email for form submissions
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key

## Deployment

The site is deployed on Kinsta hosting platform.

## Service Requests Management

The project uses Firebase Realtime Database to track service schedule requests. Service requests are automatically saved to Firebase when users submit the service schedule form.

### Viewing Service Requests

To view service requests, run:

```bash
npm run show-service-requests
```

This will show all service requests in the database. You can also filter by status:

```bash
# Show only pending requests
npm run show-service-requests -- filter pending

# Show only completed requests
npm run show-service-requests -- filter completed
```

### Updating Service Request Status

To update the status of a service request, run:

```bash
# Update a request to completed status
npm run show-service-requests -- update REQUEST_ID completed

# Update a request to in-progress status
npm run show-service-requests -- update REQUEST_ID in_progress

# Update a request to cancelled status
npm run show-service-requests -- update REQUEST_ID cancelled
```

Replace `REQUEST_ID` with the ID of the service request you want to update.

### Deploying Firebase Rules

If you need to update the Firebase security rules, edit the `database.rules.json` file and then deploy the rules:

```bash
npm run deploy-firebase-rules
```

This will authenticate with Firebase and deploy the updated rules.

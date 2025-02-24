import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type EmailType = "event" | "vehicle" | "contact";

interface BaseEmailData {
  email: string;
  type: EmailType;
}

interface EventEmailData extends BaseEmailData {
  type: "event";
  attendeeName: string;
  companyName: string;
  numberOfAttendees: number;
  eventId: string;
  phone: string;
  jobTitle: string;
  specialRequirements?: string;
}

interface VehicleEmailData extends BaseEmailData {
  type: "vehicle";
  name: string;
  phone: string;
  vehicleId: string;
  message: string;
}

interface ContactEmailData extends BaseEmailData {
  type: "contact";
  name: string;
  phone: string;
  message: string;
}

export type EmailData = EventEmailData | VehicleEmailData | ContactEmailData;

const getEventEmailContent = (data: EventEmailData) => ({
  userSubject: "Event Registration Confirmation",
  userHtml: `
    <h1>Registration Confirmed</h1>
    <p>Thank you for registering for our event!</p>
    <h2>Registration Details:</h2>
    <ul>
      <li>Name: ${data.attendeeName}</li>
      <li>Company: ${data.companyName}</li>
      <li>Number of Attendees: ${data.numberOfAttendees}</li>
    </ul>
    <p>We'll send you additional details about the event soon.</p>
  `,
  adminSubject: "New Event Registration",
  adminHtml: `
    <h1>New Event Registration</h1>
    <h2>Registration Details:</h2>
    <ul>
      <li>Event ID: ${data.eventId}</li>
      <li>Name: ${data.attendeeName}</li>
      <li>Company: ${data.companyName}</li>
      <li>Email: ${data.email}</li>
      <li>Phone: ${data.phone}</li>
      <li>Job Title: ${data.jobTitle}</li>
      <li>Number of Attendees: ${data.numberOfAttendees}</li>
      <li>Special Requirements: ${data.specialRequirements || "None"}</li>
    </ul>
  `
});

const getVehicleEmailContent = (data: VehicleEmailData) => ({
  userSubject: "Vehicle Inquiry Confirmation",
  userHtml: `
    <h1>Inquiry Received</h1>
    <p>Thank you for your interest in our vehicle!</p>
    <h2>Inquiry Details:</h2>
    <ul>
      <li>Name: ${data.name}</li>
      <li>Message: ${data.message}</li>
    </ul>
    <p>We'll get back to you as soon as possible.</p>
  `,
  adminSubject: "New Vehicle Inquiry",
  adminHtml: `
    <h1>New Vehicle Inquiry</h1>
    <h2>Inquiry Details:</h2>
    <ul>
      <li>Vehicle ID: ${data.vehicleId}</li>
      <li>Name: ${data.name}</li>
      <li>Email: ${data.email}</li>
      <li>Phone: ${data.phone}</li>
      <li>Message: ${data.message}</li>
    </ul>
  `
});

const getContactEmailContent = (data: ContactEmailData) => ({
  userSubject: "Contact Form Submission Received",
  userHtml: `
    <h1>Message Received</h1>
    <p>Thank you for contacting us!</p>
    <h2>Message Details:</h2>
    <ul>
      <li>Name: ${data.name}</li>
      <li>Message: ${data.message}</li>
    </ul>
    <p>We'll get back to you as soon as possible.</p>
  `,
  adminSubject: "New Contact Form Submission",
  adminHtml: `
    <h1>New Contact Form Submission</h1>
    <h2>Message Details:</h2>
    <ul>
      <li>Name: ${data.name}</li>
      <li>Email: ${data.email}</li>
      <li>Phone: ${data.phone}</li>
      <li>Message: ${data.message}</li>
    </ul>
  `
});

const getEmailContent = (data: EmailData) => {
  switch (data.type) {
    case "event":
      return getEventEmailContent(data);
    case "vehicle":
      return getVehicleEmailContent(data);
    case "contact":
      return getContactEmailContent(data);
  }
};

export const sendEmail = async (data: EmailData) => {
  const content = getEmailContent(data);

  // Send confirmation to user
  await resend.emails.send({
    from: "Border Trucks <no-reply@borderint.com>",
    to: [data.email],
    subject: content.userSubject,
    html: content.userHtml,
  });

  // Send notification to admin
  await resend.emails.send({
    from: "Border Trucks <no-reply@borderint.com>",
    to: ["hector.sanchez@borderint.com"], // TODO: Make configurable
    subject: content.adminSubject,
    html: content.adminHtml,
  });
};

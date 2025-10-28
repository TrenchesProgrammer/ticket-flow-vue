# TicketFlow - Vue.js Implementation

This is the Vue.js version of the TicketFlow application, a multi-framework ticket management web app.

## Frameworks and Libraries

*   **Framework:** [Vue.js](https://vuejs.org/)
*   **Bundler:** [Vite](https://vitejs.dev/)
*   **Routing:** [Vue Router](https://router.vuejs.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Toast Notifications:** [Vue Toastification](https://vue-toastification.maronato.dev/)
*   **Icons:** [Iconify](https://iconify.design/)
*   **Unique IDs:** [UUID](https://github.com/uuidjs/uuid)

## Setup and Execution

1.  **Install dependencies:**
    ```sh
    npm install
    ```
2.  **Run the development server:**
    ```sh
    npm run dev
    ```
3.  **Build for production:**
    ```sh
    npm run build
    ```

## Switching Between Frameworks

This repository contains only the Vue.js implementation. To switch to other frameworks (React, Twig), you will need to check out their respective repositories.

## UI Components and State Structure

### Components

*   `Navbar.vue`: The main navigation bar, which is responsive and shows different links based on authentication status.
*   `Footer.vue`: The footer component.
*   `HomeView.vue`: The landing page.
*   `LoginView.vue`: The login page.
*   `SignupView.vue`: The signup page.
*   `DashboardView.vue`: The dashboard page, which shows ticket statistics.
*   `TicketsView.vue`: The main page for managing tickets (CRUD).
*   `TicketModal.vue`: A modal for creating new tickets.
*   `TicketDetailsModal.vue`: A modal for viewing and editing existing tickets.
*   `ConfirmationModal.vue`: A modal for confirming ticket deletion.
*   `TestimonialCard.vue`: A card for displaying user testimonials.
*   `Faq.vue`: A component for the FAQ section.
*   `FaqItem.vue`: A single FAQ item.
*   `AutoScroll.vue`: A component for auto-scrolling content.

### State Management

The application uses a simple form of state management based on `localStorage`.

*   **Authentication:** A session token is stored in `localStorage` under the key `ticketapp_session`. The `utils/auth.ts` file contains functions for logging in, signing up, logging out, and getting the current session.
*   **Tickets:** Tickets are stored in `localStorage` under the key `ticketapp_tickets`. The `TicketsView.vue` component is responsible for all CRUD operations on tickets.

## Accessibility

*   Semantic HTML is used where possible.
*   Buttons and links have clear text.
*   Inputs have labels (although some are screen-reader only).
*   Focus states are visible on interactive elements.

## Test User Credentials

You can sign up with any email and password. The application uses `localStorage` for user and session management, so no real authentication is performed.
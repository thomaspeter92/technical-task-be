# Quiz App

A small interactive quiz application built with **React** and **Vite**.

## 🚀 About

This project was built using **React with Vite**. While in a production-grade application I might typically use Next.js, the added complexity wasn’t necessary for this use case — since the app doesn’t require some of Next.js's advanced features like SSR, routing, or SEO optimizations. The app was developed running node version 22.

## Tech Stack

- React
- TypeScript
- Axios
- Vite
- Tailwind CSS
- React Query
- React Hook Form
- Headless UI

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**

```bash
	pnpm install
```

3. **Run in dev mode**

```bash
	pnpm run dev
```

4.  **Run in prod mode**

```bash
	pnpm run build
	pnpm run preview
```

\*There is no need for a .env file in this app, the API URL is hardcoded into the axios instance.

## Dependencies

#### Axios

I chose to use Axios as the HTTP client for this application. Although this is a relatively simple app, I aimed to use production-quality dependencies wherever appropriate. I have worked with Axios a lot and I like its intuitive API, interceptor support, automatic JSON transformation, and better error handling out of the box compared to fetch.

#### React Query

I used React Query to manage data fetching and caching in the app. Even though this is a small project, I like using React Query to handle server state. Caching, background refetching, request deduplication, and loading/error states are something I have made use of regularly in past projects. I find the query invalidation to be very convenient, and I have made use of it in this app when a user submits their quiz answers so they are met with the 'See results" view.

#### TailwindCSS

I chose TailwindCSS as I find it quick to develop with and it is also listed in the job description as a required skill. Although I didn't make use of a custom tailwind config in this project, it is something I would usually implement.

#### React Hook Form

I chose React Hook Form because I wanted to use a production quality form library. I have used various libraries including Formik and Hook Form, yet I prefer Hook form as the API is more intuitive to me. The performance tends to be much better, especially in larger, complex forms due to its use of uncontrolled components.

#### Headless UI

I prefer to use unstyled component libraries whenever possible, and I have been a fan of Headless UI for a while. I like that the components are accessible out of the box yet allow for complete control over the styling when compared to other libraries like MaterialUI. It also paris well with Tailwind. I used this for the radio buttons within the form as it saved time compared to coding out fully accessible custom radio inputs.

## Limitations

There are various parts of the application I would have liked to develop further, however I wanted to stay within the time limitations. I will explain each here:

#### Loading & Error States

I did not properly handle API errors or loading UI within this application due to time restraints. If I were to develop this further I would tap into React Query's loading and error states to provide a proper UI for the user. For loading I would mostly likely use a loading UI skeleton as I find it to be the most contemporary practice and it results in less layout shift, being less jarring for the user.

For errors I would display helpful errors messages back to the user, such as if the API malfunctioned or they sent incorrect params to the API (such as a missing username in the request). I would also add proper validation errors when the user attempts to submit the quiz without answering all of the questions. I have prevented submission if the form isn't complete, but I would also like to add additional messages.

#### Animation

I did not have time to implement the UI animations within the form, specifically when a new question is loaded and when the radio button is clicked. I prioritized this feature as it doesn't prevent usability, however it does provide a nice experience. To implement this I may use a library such as Framer Motion, which I like for its simple API when creating these types of micro animations.

#### Scroll Behaviour

The design mentions being able to scroll back to see the previous questions before submitting. Again, since it did not affect usability I decided not to implement it and instead added buttons for navigating through the questions. If I were to implement it I would also make use of an animation library like Framer.

#### Accessibility

The application is not completely accessible. There are missing aria attributes throughout the application, specifically within the quiz radio buttons. In a production environment these would be non-negotiable.

# ImaginAI
The name is a play on words, combining "imagination" with "AI" to suggest that the app is a tool for turning text into images using the power of artificial intelligence. It's catchy, easy to remember, and gives a sense of creativity and innovation, which are important qualities for an AI-based application. Additionally, the name has a positive and optimistic vibe to it, which can be appealing to potential users.
## Screenshots
<img src="https://i.ibb.co/0Dz1p8z/332504808-1410958289670938-8367341359069324008-n.png" alt="332504808-1410958289670938-8367341359069324008-n" border="0">
<img src="https://i.ibb.co/1T7b3Bh/332969132-6067399833282401-7192945728421999048-n.png" alt="332969132-6067399833282401-7192945728421999048-n" border="0">
## Getting Started

First, set-up the Atlas MongoDB, Cloudinary and OpenAI API key & prepare yourself a .local.env file that contains:
``` MONGODB_URL ="mongodb+srv://********:***********@******.lpzwmx2.mongodb.net/?retryWrites=true&w=majority"
OPENAI_API_KEY = ""
CLOUDINARY_API_KEY =""
CLOUDINARY_API_SECRET = ""
CLOUDINARY_CLOUD_NAME = ""
BASE_URL = "http://yourdomain.com" 
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

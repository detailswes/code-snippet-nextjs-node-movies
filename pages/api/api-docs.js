// // api-docs.js
// import React from 'react';
// import { withSwagger } from 'next-swagger-doc';

// const SwaggerHandler = withSwagger({
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'NextJS Swagger',
//       version: '0.1.0',
//     },
//   },
//   apiFolder: 'pages/api',
// });

// const ApiDocsPage = () => {
//   // Your page content here
//   return (
//     <div>
//       <h1>API Docs</h1>
//       {/* Other content */}
//       <SwaggerHandler />
//     </div>
//   );
// };

// export default ApiDocsPage;

import { withSwagger } from 'next-swagger-doc';
import swaggerConfig from '../../swagger.config'; // Adjust the path as needed

const swaggerHandler = withSwagger({
  definition: swaggerConfig,
  apiFolder: 'pages/api',
});

export default swaggerHandler();


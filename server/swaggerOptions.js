const swaggerDefinition = {
    info: {
        title: 'Yoav Melman RTSP App',
        version: '1.0.0',
        description: '',
    },
    basePath: '/',
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
        },
    },
};

const swaggerOptions = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./api/*/*.routes.js','./api/*/*.model.js'],
};

export default swaggerOptions;

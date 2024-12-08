import express = require('express');
import { Request, Response } from 'express';
import { DataTypes, Model } from 'sequelize';
import { testConnection, sequelize } from './sequelize';

const app = express();
app.use(express.json()); // => to parse request body with http header "content-type": "application/json"


import swaggerJsdoc = require('swagger-jsdoc'); // * as swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi = require('swagger-ui-express');


const jsDocOptions = {
    definition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'Documentation for Express API with Swagger',
        },
        components: {
            schemas: {
                Todo: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                        },
                        title: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                    },
                },
                TodoNoId: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                    },
                },
                // Define other schemas as needed
                LearningPackage: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                        },
                        title: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        category: {
                            type: 'string',
                        },
                        targetAudience: {
                            type: 'string',
                        },
                        difficulty: {
                            type: 'integer',
                        },
                    },
                },
            },
        },
    },
    apis: ['app-todo.js'],
};

const apiDoc = swaggerJsdoc(jsDocOptions);
console.log('api-doc json:', JSON.stringify(apiDoc, null,2));

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(apiDoc));



app.get('/api/liveness', (req: Request, res: Response) => {
    res.send('OK !!!');
});

interface Todo {
    id?: number;
    title: string;
    description?: string;
    priority?: number;
}

let idGenerator = 1;
function newId() {
    return idGenerator++;
}
let todos : Todo[] = [
    {id: newId(), title: 'Learn TypeScript'},
    {id: newId(), title: 'Learn Angular'},
    {id: newId(), title: 'Learn NodeJs'},
    {id: newId(), title: 'Learn Express'},
];


/**
 * @openapi
 * /api/todos:
 *   get:
 *     description: Get all todos
 *     responses:
 *       200:
 *         description: An array of Todo
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Todo'
 */
app.get('/api/todos', (req: Request, res: Response) => {
    console.log('handle http GET /api/todos');
    res.send(todos);
});


/**
 * @openapi
 * /api/todos:
 *   post:
 *     description: save a new Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoNoId'
 *     responses:
 *       200:
 *         description: An array of Todo
 *         schema:
 *           $ref: '#/components/schemas/Todo'
 */
app.post('/api/todos', (req: Request, res: Response) => {
    let item = <Todo> req.body;
    console.log('handle http POST /api/todos', item);
    item.id = newId();
    todos.push(item);
    res.send(item);
});


/**
 * @openapi
 * /api/todos:
 *   put:
 *     description: update an existing todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: An array of Todo
 *         schema:
 *           $ref: '#/components/schemas/Todo'
 */
app.put('/api/todos', (req: Request, res: Response) => {
    let item = <Todo> req.body;
    console.log('handle http PUT /api/todos', item);
    const id = item.id;
    const idx = todos.findIndex((x) => x.id === id);
    if (idx !== -1) {
        const found = todos[idx];
        if (item.title) {
            found.title = item.title;
        }
        if (item.description) {
            found.description = item.description;
        }
        res.send(found);
    } else {
        res.status(404).send('Todo entity not found by id:' + id);
    }
});


/**
 * @openapi
 * /api/todos/{id}:
 *   get:
 *     description: get a todo by its id
 *     parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the Todo to get
 *           schema:
 *             type: number
 *     responses:
 *       200:
 *         description: the todo
 *         schema:
 *           $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
app.get('/api/todos/:id', (req, res) => {
    const id = +req.params['id']
    console.log('handle http GET /api/todos/:id', id);
    const idx = todos.findIndex((x) => x.id === id);
    if (idx !== -1) {
        const found = todos[idx];
        res.send(found);
    } else {
        res.status(404).send('Todo entity not found by id:' + id);
    }
});


/**
 * @openapi
 * /api/todos/{id}:
 *   delete:
 *     description: delete an existing Todo by its id
 *     parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the Todo to delete
 *           schema:
 *             type: number
 *     responses:
 *       200:
 *         description: the deleted Todo
 *         schema:
 *           $ref: '#/components/schemas/Todo'
 *       404:
 *         description: when the Todo was not found
 */
app.delete('/api/todos/:id', (req, res) => {
    const id = +req.params['id']
    console.log('handle http DELETE /api/todos/:id', id);
    const idx = todos.findIndex((x) => x.id === id);
    if (idx !== -1) {
        const found = todos.splice(idx, 1)[0];
        res.send(found);
    } else {
        res.status(404).send('Todo entity not found by id:' + id);
    }
});

// app.patch()


console.log('starting...');
app.listen(3000, () => {
    console.log('Ok, started port 3000, please open http://localhost:3000/swagger-ui');
});


// LearningPackage.ts
// Step 5: TypeScript Interface
interface LearningPackage {
    id: number;
    title: string;
    description: string;
    category: string;
    targetAudience: string;
    difficulty: number;
}

// Step 7: Hardcode Sample Data
let learningPackages: LearningPackage[] = [
    { id: 1, title: "Learn TypeScript", description: "Basics of TS", category: "Programming", targetAudience: "Beginners", difficulty: 5 },
    { id: 2, title: "Learn Node.js", description: "Backend with Node.js", category: "Programming", targetAudience: "Intermediate", difficulty: 7 },
    { id: 3, title: "Learn HTML", description: "Basics of HTML", category: "Web Development", targetAudience: "Beginners", difficulty: 2 },
    { id: 4, title: "Learn Angular", description: "Frontend Framework", category: "Programming", targetAudience: "Advanced", difficulty: 10 }
];

// API Routes
// Step 8: GET /api/package (All Packages)
/**
 * @openapi
 * /api/package:
 *   get:
 *     description: Get all packages
 *     responses:
 *       200:
 *         description: An array of LearningPackage
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/LearningPackage'
 */
app.get('/api/package', (req: Request, res: Response) => {
    res.status(200).json(learningPackages);
});

// Step 9: GET /api/package/:id (Single Package)
/**
 * @openapi
 * /api/package/{id}:
 *   get:
 *     description: get a package by its id
 *     parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the LearningPackage to get
 *           schema:
 *             type: number
 *     responses:
 *       200:
 *         description: the package
 *         schema:
 *           $ref: '#/components/schemas/LearningPackage'
 *       404:
 *         description: LearningPackage not found
 */
app.get('/api/package/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const learningPackage = learningPackages.find(pkg => pkg.id === id);
    if (learningPackage) {
        res.status(200).json(learningPackage);
    } else {
        res.status(404).send(`Entity not found for id: ${id}`);
    }
});

// Step 10: POST /api/package (Create a Package)
/**
 * @openapi
 * /api/package:
 *   post:
 *     description: save a new LearningPackage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackage'
 *     responses:
 *       200:
 *         description: An array of LearningPackage
 *         schema:
 *           $ref: '#/components/schemas/LearningPackage'
 */
app.post('/api/package', (req: Request, res: Response) => {
    const newPackage: LearningPackage = req.body;
    if (!newPackage.title || !newPackage.description) {
        res.status(400).send('Missing required fields: title or description.');
        return;
    }
    newPackage.id = learningPackages.length + 1;
    learningPackages.push(newPackage);
    res.status(200).json(newPackage);
});

// Step 11: PUT /api/package (Update a Package)
/**
 * @openapi
 * /api/package:
 *   put:
 *     description: update an existing package
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackage'
 *     responses:
 *       200:
 *         description: An array of LearningPackage
 *         schema:
 *           $ref: '#/components/schemas/LearningPackage'
 */
app.put('/api/package', (req: Request, res: Response) => {
    const updatedPackage: LearningPackage = req.body;
    const index = learningPackages.findIndex(pkg => pkg.id === updatedPackage.id);
    if (index >= 0) {
        learningPackages[index] = updatedPackage;
        res.status(200).json(updatedPackage);
    } else {
        res.status(404).send(`Entity not found for id: ${updatedPackage.id}`);
    }
});
// Step 12: GET /api/package-summaries (Summaries)
/**
 * @openapi
 * /api/package-summaries:
 *   get:
 *     description: Retrieve a summary of all learning packages
 *     responses:
 *       200:
 *         description: A list of package summaries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the package
 *                   title:
 *                     type: string
 *                     description: The title of the package
 */
app.get('/api/package-summaries', (req: Request, res: Response) => {
    const summaries = learningPackages.map(pkg => ({ id: pkg.id, title: pkg.title }));
    res.status(200).json(summaries);
});

// Step 13: GET /api/package-summaries/search (Search)
/**
 * @openapi
 * /api/package-summaries/search:
 *   get:
 *     description: Search for package summaries by title, description, or tag
 *     parameters:
 *       - name: title
 *         in: query
 *         required: false
 *         description: Title to search for (case insensitive)
 *         schema:
 *           type: string
 *       - name: description
 *         in: query
 *         required: false
 *         description: Description to search for (case insensitive)
 *         schema:
 *           type: string
 *       - name: tag
 *         in: query
 *         required: false
 *         description: Tag to search for (case insensitive)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of package summaries matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the package
 *                   title:
 *                     type: string
 *                     description: The title of the package
 */
app.get('/api/package-summaries/search', (req: Request, res: Response) => {
    const { title, description, tag } = req.query;

    // Perform case-insensitive search
    const searchResults = learningPackages.filter(pkg => {
        const matchesTitle = title
            ? pkg.title.toLowerCase().includes((title as string).toLowerCase())
            : true;
        const matchesDescription = description
            ? pkg.description.toLowerCase().includes((description as string).toLowerCase())
            : true;
        const matchesTag = tag
            ? pkg.category.toLowerCase().includes((tag as string).toLowerCase())
            : true;

        return matchesTitle && matchesDescription && matchesTag;
    });

    const summaries = searchResults.map(pkg => ({ id: pkg.id, title: pkg.title }));
    res.status(200).json(summaries);
});

// Step 16: Test the PostgreSQL connection
testConnection();

// Step 17: Configure Sequelize for Table LearningPackage
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });  // Use { force: true } to drop the table first
        console.log('Database synchronized!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

syncDatabase();

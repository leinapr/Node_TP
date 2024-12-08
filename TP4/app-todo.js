"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
var express = require("express");
var sequelize_1 = require("./sequelize");
var app = express();
app.use(express.json()); // => to parse request body with http header "content-type": "application/json"
var swaggerJsdoc = require("swagger-jsdoc"); // * as swaggerJsdoc from 'swagger-jsdoc'
var swaggerUi = require("swagger-ui-express");
var jsDocOptions = {
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
var apiDoc = swaggerJsdoc(jsDocOptions);
console.log('api-doc json:', JSON.stringify(apiDoc, null, 2));
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(apiDoc));
app.get('/api/liveness', function (req, res) {
    res.send('OK !!!');
});
var idGenerator = 1;
function newId() {
    return idGenerator++;
}
var todos = [
    { id: newId(), title: 'Learn TypeScript' },
    { id: newId(), title: 'Learn Angular' },
    { id: newId(), title: 'Learn NodeJs' },
    { id: newId(), title: 'Learn Express' },
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
app.get('/api/todos', function (req, res) {
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
app.post('/api/todos', function (req, res) {
    var item = req.body;
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
app.put('/api/todos', function (req, res) {
    var item = req.body;
    console.log('handle http PUT /api/todos', item);
    var id = item.id;
    var idx = todos.findIndex(function (x) { return x.id === id; });
    if (idx !== -1) {
        var found = todos[idx];
        if (item.title) {
            found.title = item.title;
        }
        if (item.description) {
            found.description = item.description;
        }
        res.send(found);
    }
    else {
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
app.get('/api/todos/:id', function (req, res) {
    var id = +req.params['id'];
    console.log('handle http GET /api/todos/:id', id);
    var idx = todos.findIndex(function (x) { return x.id === id; });
    if (idx !== -1) {
        var found = todos[idx];
        res.send(found);
    }
    else {
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
app.delete('/api/todos/:id', function (req, res) {
    var id = +req.params['id'];
    console.log('handle http DELETE /api/todos/:id', id);
    var idx = todos.findIndex(function (x) { return x.id === id; });
    if (idx !== -1) {
        var found = todos.splice(idx, 1)[0];
        res.send(found);
    }
    else {
        res.status(404).send('Todo entity not found by id:' + id);
    }
});
// app.patch()
console.log('starting...');
app.listen(3000, function () {
    console.log('Ok, started port 3000, please open http://localhost:3000/swagger-ui');
});
// Step 7: Hardcode Sample Data
var learningPackages = [
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
app.get('/api/package', function (req, res) {
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
app.get('/api/package/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var learningPackage = learningPackages.find(function (pkg) { return pkg.id === id; });
    if (learningPackage) {
        res.status(200).json(learningPackage);
    }
    else {
        res.status(404).send("Entity not found for id: ".concat(id));
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
app.post('/api/package', function (req, res) {
    var newPackage = req.body;
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
app.put('/api/package', function (req, res) {
    var updatedPackage = req.body;
    var index = learningPackages.findIndex(function (pkg) { return pkg.id === updatedPackage.id; });
    if (index >= 0) {
        learningPackages[index] = updatedPackage;
        res.status(200).json(updatedPackage);
    }
    else {
        res.status(404).send("Entity not found for id: ".concat(updatedPackage.id));
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
app.get('/api/package-summaries', function (req, res) {
    var summaries = learningPackages.map(function (pkg) { return ({ id: pkg.id, title: pkg.title }); });
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
app.get('/api/package-summaries/search', function (req, res) {
    var _a = req.query, title = _a.title, description = _a.description, tag = _a.tag;
    // Perform case-insensitive search
    var searchResults = learningPackages.filter(function (pkg) {
        var matchesTitle = title
            ? pkg.title.toLowerCase().includes(title.toLowerCase())
            : true;
        var matchesDescription = description
            ? pkg.description.toLowerCase().includes(description.toLowerCase())
            : true;
        var matchesTag = tag
            ? pkg.category.toLowerCase().includes(tag.toLowerCase())
            : true;
        return matchesTitle && matchesDescription && matchesTag;
    });
    var summaries = searchResults.map(function (pkg) { return ({ id: pkg.id, title: pkg.title }); });
    res.status(200).json(summaries);
});
// Step 16: Test the PostgreSQL connection
(0, sequelize_1.testConnection)();
// Step 17: Configure Sequelize for Table LearningPackage
var syncDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Sync the model with the database (this will create the table if it doesn't exist)
                return [4 /*yield*/, sequelize_1.sequelize.sync({ force: false })];
            case 1:
                // Sync the model with the database (this will create the table if it doesn't exist)
                _a.sent(); // Use { force: true } to drop the table first
                console.log('Database synchronized!');
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error syncing database:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
syncDatabase();

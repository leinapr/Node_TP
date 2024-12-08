import { DataTypes, Model, Sequelize } from 'sequelize';

// Define the PostgreSQL connection options
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'postgres',
    database: 'LearningFactDb',
    username: 'learningDbUser',
    password: 'leina2004',
    logging: false,
    define: {
        timestamps: false // Set to true if you want Sequelize to manage createdAt/updatedAt
    }
});

// Test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

export { sequelize };

// Step 17: Configure Sequelize for Table LearningPackage
class LearningPackage extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public duration!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

LearningPackage.init(
    {
        id: {
            type: DataTypes.INTEGER,  // Integer type for the primary key
            primaryKey: true,
            autoIncrement: true,      // Auto-increment the id value
        },
        title: {
            type: DataTypes.STRING(255), // A string of up to 255 characters for the title
            allowNull: false,           // Title is required (cannot be null)
        },
        description: {
            type: DataTypes.TEXT,       // Text type for longer descriptions
            allowNull: true,            // Description is optional
        },
        duration: {
            type: DataTypes.INTEGER,    // Integer type for duration
            allowNull: false,           // Duration is required
        },
        createdAt: {
            type: DataTypes.DATE,       // Date type for the creation timestamp
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Default to current timestamp
        },
        updatedAt: {
            type: DataTypes.DATE,       // Date type for the update timestamp
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Default to current timestamp
        },
    },
    {
        sequelize,
        tableName: 'LearningPackage',
        modelName: 'LearningPackage',
        timestamps: true,
        underscored: true,
    }
);

export class LearningFact extends Model {
    public id!: number;
    public packageId!: number;
    public content!: string;
    public disabled!: boolean;
}

LearningFact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        packageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'LearningFact',
        tableName: 'learning_facts', // Your table name
        timestamps: true,
    }
);

LearningPackage.hasMany(LearningFact, {
    foreignKey: 'packageId',
});
LearningFact.belongsTo(LearningPackage, {
    foreignKey: 'packageId',
});

export {LearningPackage, testConnection};

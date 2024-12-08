import express from 'express';
import { LearningPackage } from './sequelize';

const router = express.Router();

// Step 19: Re-implement you express api operation using the database
// Get all LearningFacts for a given LearningPackage
router.get('/api/package/:id/fact', async (req, res) => {
    const packageId = req.params.id;
    try {
        const facts = await LearningFact.findAll({
            where: { packageId },
            include: [
                {
                    model: LearningPackage,
                    attributes: ['id', 'name', 'description'], // You can include relevant fields from the package
                },
            ],
        });
        res.status(200).json(facts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching LearningFacts' });
    }
});

// Create a new LearningFact for a given LearningPackage
router.post('/api/package/:id/fact', async (req, res) => {
    const packageId = req.params.id;
    const { content } = req.body;

    try {
        const newFact = await LearningFact.create({
            packageId,
            content,
        });
        res.status(201).json(newFact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding a new LearningFact' });
    }
});

// Update an existing LearningFact for a given LearningPackage
router.put('/api/package/:id/fact/:factId', async (req, res) => {
    const packageId = req.params.id;
    const factId = req.params.factId;
    const { content } = req.body;

    try {
        const fact = await LearningFact.findOne({
            where: { id: factId, packageId },
        });

        if (!fact) {
            res.status(404).json({ error: 'LearningFact not found' });
            return;
        }

        fact.content = content;
        await fact.save();
        res.status(200).json(fact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the LearningFact' });
    }
});

// Delete an existing LearningFact (mark it as disabled)
router.delete('/api/package/:id/fact/:factId', async (req, res) => {
    const packageId = req.params.id;
    const factId = req.params.factId;

    try {
        const fact = await LearningFact.findOne({
            where: { id: factId, packageId },
        });

        if (!fact) {
            res.status(404).json({ error: 'LearningFact not found' });
            return;
        }

        fact.disabled = true; // Mark as disabled instead of deleting
        await fact.save();
        res.status(200).json({ message: 'LearningFact disabled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the LearningFact' });
    }
});

// Model Definition
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LearningFactSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        ref: 'LearningPackage',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    disabled: {
        type: Boolean,
        default: false
    }
});

const LearningFact = mongoose.model('LearningFact', LearningFactSchema);
module.exports = LearningFact;

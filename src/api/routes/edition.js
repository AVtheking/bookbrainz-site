/*
 * Copyright (C) 2019  Akhilesh Kumar
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import {aliasesRelation, identifiersRelation, relationshipsRelation} from '../helpers/utils';
import {getEditionBasicInfo, getEntityAliases, getEntityIdentifiers, getEntityRelationships} from '../helpers/formatEntityData';
import _ from 'lodash';
import express from 'express';
import {makeEntityLoader} from '../helpers/entityLoader';


const router = express.Router();

const editionBasicRelations = [
	'defaultAlias.language',
	'languageSet.languages',
	'disambiguation',
	'editionFormat',
	'editionStatus',
	'releaseEventSet.releaseEvents'
];

const editionError = 'Edition not found';

/**
 *@swagger
 *definitions:
 *  EditionDetail:
 *    type: object
 *    properties:
 *      bbid:
 *        type: string
 *        format: uuid
 *        example: '96a23368-85a1-4559-b3df-16833893d861'
 *      defaultAlias:
 *        $ref: '#/definitions/defaultAlias'
 *      depth:
 *        type: integer
 *        description: 'depth in mm'
 *        example: 40
 *      disambiguation:
 *        type: string
 *        example: 'Harry Porter'
 *      editionFormat:
 *        type: string
 *        example: 'eBook'
 *      hight:
 *        type: integer
 *        description: 'hight in mm'
 *        example: 250
 *      languages:
 *        type: array
 *        items:
 *          type: string
 *          example: 'English'
 *      pages:
 *        type: integer
 *        example: 200
 *      releaseEventDates:
 *        type: string
 *        example: '2011-01-01'
 *      status:
 *        type: string
 *        example: 'Official'
 *      weight:
 *        type: integer
 *        description: 'Weight in grams'
 *        example: 300
 *      width:
 *        type: integer
 *        description: 'width in mm'
 *        example: 80
 *
 */


/**
 *
 * @swagger
 * '/edition/{bbid}':
 *    get:
 *      tags:
 *        - Lookup Requests
 *      summary: Lookup Edition by bbid
 *      description: Returns the basic details an Edition
 *      operationId: getEditionByBbid
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: bbid
 *          in: path
 *          description: BBID of Edition to return
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Basic information of an Edition entity
 *          schema:
 *              $ref: '#/definitions/EditionDetail'
 *        404:
 *          description: Edition not found
 */


router.get('/:bbid',
	makeEntityLoader('Edition', editionBasicRelations, editionError),
	async (req, res, next) => {
		const editionBasicInfo = await getEditionBasicInfo(res.locals.entity);
		return res.status(200).send(editionBasicInfo);
	});

/**
 *	@swagger
 * '/edition/{bbid}/aliases':
 *   get:
 *     tags:
 *       - Lookup Requests
 *     summary: Get list of aliases of the edition by BBID
 *     description: Returns the list of aliases of the edition
 *     operationId: getAliasesOfEditionByBbid
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bbid
 *         in: path
 *         description: BBID of the edition
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of aliases with BBID of the edition entity
 *         schema:
 *             $ref: '#/definitions/aliases'
 *       404:
 *         description: Edition not found
 */

router.get('/:bbid/aliases',
	makeEntityLoader('Edition', aliasesRelation, editionError),
	async (req, res, next) => {
		const editionAliasesList = await getEntityAliases(res.locals.entity);
		return res.status(200).send(editionAliasesList);
	});

/**
 *	@swagger
 * '/edition/{bbid}/identifiers':
 *   get:
 *     tags:
 *       - Lookup Requests
 *     summary: Get list of identifiers of an edition by BBID
 *     description: Returns the list of identifiers of an edition
 *     operationId: getIdentifiersOfEditionByBbid
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bbid
 *         in: path
 *         description: BBID of the edition
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of identifiers with BBID of an edition entity
 *         schema:
 *             $ref: '#/definitions/identifiers'
 *       404:
 *         description: Edition not found
 */

router.get('/:bbid/identifiers',
	makeEntityLoader('Edition', identifiersRelation, editionError),
	async (req, res, next) => {
		const editionIdentifiersList = await getEntityIdentifiers(res.locals.entity);
		return res.status(200).send(editionIdentifiersList);
	});

/**
 *	@swagger
 * '/edition/{bbid}/relationships':
 *   get:
 *     tags:
 *       - Lookup Requests
 *     summary: Get list of relationships of an edition by BBID
 *     description: Returns the list of relationships of an edition
 *     operationId: getRelationshipsOfEditionByBbid
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bbid
 *         in: path
 *         description: BBID of the edition
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of relationships with BBID of an edition entity
 *         schema:
 *             $ref: '#/definitions/relationships'
 *       404:
 *         description: Edition not found
 */

router.get('/:bbid/relationships',
	makeEntityLoader('Edition', relationshipsRelation, editionError),
	async (req, res, next) => {
		const editionRelationshipList = await getEntityRelationships(res.locals.entity);
		return res.status(200).send(editionRelationshipList);
	});

export default router;

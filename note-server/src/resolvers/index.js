const Query = require('./query')
const Mutation = require('./mutation')
const {GraphQLDateTime}=require('graphql-iso-date')
const Note=require('./note')
const User=require('./user')

module.exports = {
    Query,
    Mutation,
    Note,
    User,
    DateTime: GraphQLDateTime
}
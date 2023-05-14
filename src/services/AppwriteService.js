import { Client, Account, Databases, ID, Functions } from 'appwrite'
import config from '../../config.js'

const envs = {
  baseUrl: config.APPWRITE.BASE_URL,
  projectId: config.APPWRITE.PROJECT_ID,
  guests: {
    databaseId: config.APPWRITE.GUESTS.DATABASE_ID,
    guestCollectionId: config.APPWRITE.GUESTS.GUEST_COLLECTION_ID,
    guestGroupCollectionId: config.APPWRITE.GUESTS.GUEST_GROUP_COLLECTION_ID,
  },
  questions: {
    databaseId: config.APPWRITE.QUESTIONS.DATABASE_ID,
    guestCollectionId: config.APPWRITE.QUESTIONS.COLLECTION_ID,
  },
  functions: {
    createGuestFunctionId: config.APPWRITE.FUNCTIONS.CREATE_GUEST_ID,
  }
}

class AppwriteService {
  static #client = new Client()
  static #account = new Account(this.#client)
  static #databases = new Databases(this.#client)
  static #functions = new Functions(this.#client)

  // init
  static init = () => {
    this.#client.setEndpoint(envs.baseUrl).setProject(envs.projectId)
  }

  static createGuest = (data) => {
    let promise = this.#functions.createExecution(envs.functions.createGuestFunctionId, JSON.stringify(data))

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }

  //session
  static createSession = (email, password) => {
    const promise = this.#account.createEmailSession(email, password)

    promise.then(
      function (response) {
        sessionStorage.setItem('_session', JSON.stringify(response))
      },
      function (error) {
        console.log('ERR SESSION ', error)
      },
    )
  }
  static deleteSession = () => {
    const sessionId = JSON.parse(sessionStorage.getItem('_session')).$id
    const promise = this.#account.deleteSession(sessionId)

    promise.then(
      function (response) {
        sessionStorage.removeItem('_session')
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }

  //guests
  static getGuests = () => {
    const promise = this.#databases.listDocuments(envs.guests.databaseId, envs.guests.guestCollectionId)

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }
  static addGuest = (guestName, guestWelcomeText) => {
    const promise = this.#databases.createDocument(envs.guests.databaseId, envs.guests.guestCollectionId, ID.unique(), {
      guestName,
      guestWelcomeText,
    })

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }
  static updateGuest = (guestId) => {
    const promise = this.#databases.updateDocument(envs.guests.databaseId, envs.guests.guestCollectionId, guestId)

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }
  static deleteGuest = (guestId) => {
    const promise = this.#databases.deleteDocument(envs.guests.databaseId, envs.guests.guestCollectionId, guestId)

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }

  //guest group
  static getGuestGroups = () => {
    const promise = this.#databases.listDocuments(envs.guests.databaseId, envs.guests.guestGroupCollectionId)

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }
  static addGuestGroup = (guestIds) => {
    const promise = this.#databases.createDocument(
      envs.guests.databaseId,
      envs.guests.guestGroupCollectionId,
      ID.unique(),
      { guestIds },
    )

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }
  static updateGuestGroup = (guestGroupId) => {
    const promise = this.#databases.updateDocument(
      envs.guests.databaseId,
      envs.guests.guestGroupCollectionId,
      guestGroupId,
    )

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }
  static deleteGuestGroup = (guestGroupId) => {
    const promise = this.#databases.deleteDocument(
      envs.guests.databaseId,
      envs.guests.guestGroupCollectionId,
      guestGroupId,
    )

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }

  // questions
  static getQuestions = () => {
    const promise = this.#databases.listDocuments(envs.questions.databaseId, envs.questions.guestCollectionId)

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }
  static addQuestion = (questionTitle, answers) => {
    const promise = this.#databases.createDocument(
      envs.questions.databaseId,
      envs.questions.guestCollectionId,
      ID.unique(),
      {
        questionTitle,
        answers,
      },
    )

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }
  static updateQuestion = (questionId) => {
    const promise = this.#databases.updateDocument(
      envs.questions.databaseId,
      envs.questions.guestCollectionId,
      questionId,
    )

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }
  static deleteQuestion = (questionId) => {
    const promise = this.#databases.deleteDocument(
      envs.questions.databaseId,
      envs.questions.guestCollectionId,
      questionId,
    )

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      },
    )
  }
}

export default AppwriteService

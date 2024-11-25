/**
 * @typedef {Object} Image
 * @property {string} uri - The URI of the image.
 * @property {string} alt - The alternative text for the image.
 */

/**
 * @typedef {Object} Option
 * @property {string} id - The unique ID for the option.
 * @property {string} text - The text of the option.
 * @property {boolean} isCorrect - Whether the option is the correct answer.
 */

/**
 * @typedef {Object} Question
 * @property {string} id - The unique ID of the question.
 * @property {string} question - The question text.
 * @property {Image} [image] - The optional image associated with the question.
 * @property {string} hint - A hint for the question.
 * @property {Option[]} options - The list of options for the question.
 * @property {string} answerDescription - Description of the correct answer.
 */

/**
 * @typedef {Object} Test
 * @property {string} id - The unique ID of the test.
 * @property {string} title - The title of the test.
 * @property {Image} [image] - The optional image for the test.
 * @property {string} testName - The name of the test ("flags" | "solarSystem").
 * @property {number} numOfQuestions - The number of questions in the test.
 * @property {number} duration - The duration of the test in minutes.
 */

/**
 * @typedef {"flags" | "solarSystem"} TestName
 */
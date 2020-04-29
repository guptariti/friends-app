const questions = [];

const addQuestion = ({question, room}) => {
    const quest = {question, room};
    questions.push(quest);
    console.log(questions);
}

const getAllQuestions = (room) => {
    return questions.filter((quest) => quest.room === room);
}

module.exports = { addQuestion, getAllQuestions};
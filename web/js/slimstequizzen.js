'use strict';

var slimsteQuizzen = {
    mogelijkeQuizzen: [],
    registerQuiz: function(quiz) {
        if (!quiz) {
            return;
        }
        this[quiz.titel] = quiz;
        this.mogelijkeQuizzen.push(quiz.titel);
    }
};

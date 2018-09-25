module.exports = class {
    constructor(data) {
        this.id = data.Id;
        this.lesson = data.Lesson; //TODO: class lesson
        this.subject = data.Subject; //TODO: class subject
        this.student = data.Student; //TODO: class student
        this.category = data.Category; //TODO: class category
        this.addedBy = data.AddedBy; //TODO: class user
        this.grade = data.Grade;
        this.date = data.Date
    }
};
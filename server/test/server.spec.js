"use strict";

const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

const mongoose = require("mongoose");
require("sinon-mongoose");

var Activity = require("../models/Activity");
var Mood = require("../models/Mood");

describe("Get all activities", function() {
  it("should return all activities", function(done) {
    var ActivityMock = sinon.mock(Activity);
    var expectedResult = { status: true, activities: [] };
    ActivityMock.expects("find").yields(null, expectedResult);
    Activity.find(function(err, result) {
      ActivityMock.verify();
      ActivityMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it("should return error", function(done) {
    var ActivityMock = sinon.mock(Activity);
    var expectedResult = { status: false, error: "Something went wrong" };
    ActivityMock.expects("find").yields(expectedResult, null);
    Activity.find(function(err, result) {
      ActivityMock.verify();
      ActivityMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});

describe("Create a new activity", function() {
  it("should create a new activity", function(done) {
    var ActivityMock = sinon.mock(
      new Activity({ name: "Create a new todo from mock" })
    );
    var activity = ActivityMock.object;
    var expectedResult = { status: true };
    ActivityMock.expects("save").yields(null, expectedResult);
    activity.save(function(err, result) {
      ActivityMock.verify();
      ActivityMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it("should return an error if the new activity is not saved", function(done) {
    var ActivityMock = sinon.mock(
      new Activity({ name: "Create a new todo from mock" })
    );
    var activity = ActivityMock.object;
    var expectedResult = { status: false };
    ActivityMock.expects("save").yields(expectedResult, null);
    activity.save(function(err, result) {
      ActivityMock.verify();
      ActivityMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});
  
describe("Get all moods", function() {
  it("should return all moods", function(done) {
    var MoodMock = sinon.mock(Mood);
    var expectedResult = { status: true, moods: [] };
    MoodMock.expects("find").yields(null, expectedResult);
    Mood.find(function(err, result) {
      MoodMock.verify();
      MoodMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it("should return error", function(done) {
    var MoodMock = sinon.mock(Mood);
    var expectedResult = { status: false, error: "Something went wrong" };
    MoodMock.expects("find").yields(expectedResult, null);
    Mood.find(function(err, result) {
      MoodMock.verify();
      MoodMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});

describe("Create a new mood", function() {
  it("should create a new mood", function(done) {
    var MoodMock = sinon.mock(
      new Mood({ name: "Test mood" })
    );
    var mood = MoodMock.object;
    var expectedResult = { status: true };
    MoodMock.expects("save").yields(null, expectedResult);
    mood.save(function(err, result) {
      MoodMock.verify();
      MoodMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it("should return an error if the new mood is not saved", function(done) {
    var MoodMock = sinon.mock(
      new Mood({ name: "Test mood" })
    );
    var mood = MoodMock.object;
    var expectedResult = { status: false };
    MoodMock.expects("save").yields(expectedResult, null);
    mood.save(function(err, result) {
      MoodMock.verify();
      MoodMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});
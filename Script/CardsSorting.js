<<<<<<< HEAD
﻿
function getCategory(hand) {
    var groupBySuit = group("suitValue", hand);
    var groupByRank = group("rankValue", hand);
    
    if (isRoyalFlush(groupBySuit)) return [1, "royal flush"];
    if (isStraightFlush(groupBySuit)) return [2, "straight flush"];
    if (isFourOfAKind(groupByRank)) return [3, "four of a kind"];
    if (isFullHouse(groupByRank)) return [4, "full house"];
    if (isFlush(groupBySuit, groupByRank)) return [5, "flush"];
    if (isStraight(groupBySuit, groupByRank)) return [6, "straight"];
    if (isThreeOfAKind(groupByRank)) return [7, "three of a kind"];
    if (isTwoPair(groupByRank)) return [8, "two pair"];
    if (isOnePair(groupByRank)) return [9, "one pair"];
    if (isHighCard(groupByRank)) return [10, "high card"];

    return "unknown combination";
}

function isStraightFlush(group) {
    if (group.length != 1) return false;
    var sorted = group[0].sort(function (a, b) {
        if (a.rankValue == b.rankValue) return 0;
        if (a.rankValue < b.rankValue) return -1;
        else return 1;
    });
    for (var i = 0; i < sorted.length - 1; i++) {
        if (!(sorted[i + 1].rankValue - sorted[i].rankValue == 1)) { return false; }
    }
    return true;
}

function isRoyalFlush(group) {
    if (!isStraightFlush(group)) return false;
    for (var i = 0; i < group[0].length - 1; i++) {
        if (group[0][i].rankValue == 1) { return true; } //if ace is found in the straight flush, it is a royal flush
    }
    return false;
}

function isFourOfAKind(group) {
    if (group.length != 2) return false; //should contain 4 cards of the same rank, that means that hand has only 2 rank groups
    $(group).each(function () {
        if (this.length == 4) return true; //groups can only have 4 or 1 cards
        if (this.length == 1) return true;
    });
    return false;
}

function isFullHouse(group) {
    if (group.length != 2) return false; //contains 3 cards of one rank and 2 cards of another, so 2 rank groups
    $(group).each(function () {
        if (this.length == 3) return true; //groups can only have 3 or 2 cards
        if (this.length == 2) return true;
    });
    return false;
}

function isFlush(groupBySuit, groupByRank) {
    if (groupBySuit.length != 1) return false; //contains 5 cards of the same suit
    if (groupByRank.length != 5) return false;
    return true;
}

function isStraight(groupBySuit, groupByRank) {
    if (groupBySuit.length == 1) return false; // 5 cards of sequential rank, different suites 
    if (groupByRank.length != 5) return false;

    var ranks = [];
    $(groupByRank).each(function () {
        ranks.push(this[0].rankValue);
    });
    ranks.sort();
    for (var i = 0; i < ranks.length - 1; i++) {
        if (!(ranks[i + 1] - ranks[i] == 1)) { return false; }
    }
    return true;
}

function isThreeOfAKind(groupByRank) {
    if (groupByRank.length != 3) return false; //3 cards of the same rank and 2 cards of other ranks, so 3 groups by rank
    for (var i = 0; i < groupByRank.length; i++) {
        if (groupByRank[i].length == 3) return true;
    }
    return false;
}

function isTwoPair(groupByRank) {
    if (groupByRank.length != 3) return false; //2 cards of the same rank, 2 cards of another rank, and one of a third = 3 rank groups
    var numberOfGroupsWithTwoCards = 0;
    for (var i = 0; i < groupByRank.length; i++) {
        if (groupByRank[i].length == 2) numberOfGroupsWithTwoCards++;
        if (numberOfGroupsWithTwoCards == 2) return true;
    }
    return false;
}

function isOnePair(groupByRank) {
    if (groupByRank.length != 4) return false; //2 cards of the same rank, and 3 of other ranks = 4 rank groups
    for (var i = 0; i < groupByRank.length; i++) {
        if (groupByRank[i].length == 2) return true;
    }
    return false;
}

function isHighCard(groupByRank) {
    if (groupByRank.length != 5) return false; //all cards of different ranks, i.e. 5 rank groups
    return true;
}

function group(keyName, cards) {
    var groupByKey = [];
    $(cards).each(function () {
        var groupkey;
        groupkey = this[keyName];
        var currentGroup = groupByKey[groupkey];
        if (!currentGroup) {
            groupByKey[groupkey] = [];
        }
        groupByKey[groupkey].push(this);
    });
    var groupArray = [];
    $(groupByKey).each(function (index, value) {
        if (!(value == null)) groupArray.push(this);
    });

    return groupArray;
=======
﻿
function getCategory(hand) {
    var groupBySuit = group("suitValue", hand);
    var groupByRank = group("rankValue", hand);

    if (isStraightFlush(groupBySuit)) return "straight flush";
    if (isFourOfAKind(groupByRank)) return "four of a kind";
    if (isFullHouse(groupByRank)) return "full house";
    if (isFlush(groupBySuit, groupByRank)) return "flush";
    if (isStraight(groupBySuit, groupByRank)) return "straight";
    if (isThreeOfAKind(groupByRank)) return "three of a kind";
    if (isTwoPair(groupByRank)) return "two pair";
    if (isOnePair(groupByRank)) return "one pair";
    if (isHighCard(groupByRank)) return "high card";

    return "unknown combination";
}

function isStraightFlush(group) {
    if (group.length != 1) return false;
    var sorted = group[0].sort(function (a, b) {
        if (a.rankValue == b.rankValue) return 0;
        if (a.rankValue < b.rankValue) return -1;
        else return 1;
    });
    for (var i = 0; i < sorted.length - 1; i++) {
        if (!(sorted[i + 1].rankValue - sorted[i].rankValue == 1)) { return false; }
    }
    return true;
}

function isFourOfAKind(group) {
    if (group.length != 2) return false;
    $(group).each(function () {
        if (this.length == 4) return true;
    });
    return false;
}

function isFullHouse(group) {
    if (group.length != 2) return false;
    $(group).each(function () {
        if (this.length == 3) return true;
    });
    return false;
}

function isFlush(groupBySuit, groupByRank) {
    if (groupBySuit.length != 1) return false;
    if (groupByRank.length != 5) return false;
    return true;
}

function isStraight(groupBySuit, groupByRank) {
    if (groupBySuit.length == 1) return false;
    if (groupByRank.length != 5) return false;

    var ranks = [];
    $(groupByRank).each(function () {
        ranks.push(this[0].rankValue);
    });
    ranks.sort();
    for (var i = 0; i < ranks.length - 1; i++) {
        if (!(ranks[i + 1] - ranks[i] == 1)) { return false; }
    }
    return true;
}

function isThreeOfAKind(groupByRank) {
    if (groupByRank.length != 3) return false;
    for (var i = 0; i < groupByRank.length; i++) {
        if (groupByRank[i].length == 3) return true;
    }
    return false;
}

function isTwoPair(groupByRank) {
    if (groupByRank.length != 3) return false;
    var numberOfGroupsWithTwoCards = 0;
    for (var i = 0; i < groupByRank.length; i++) {
        if (groupByRank[i].length == 2) numberOfGroupsWithTwoCards++;
        if (numberOfGroupsWithTwoCards == 2) return true;
    }
    return false;
}

function isOnePair(groupByRank) {
    if (groupByRank.length != 4) return false;
    for (var i = 0; i < groupByRank.length; i++) {
        if (groupByRank[i].length == 2) return true;
    }
    return false;
}

function isHighCard(groupByRank) {
    if (groupByRank.length != 5) return false;
    return true;
}

function group(keyName, cards) {
    var groupByKey = [];
    $(cards).each(function () {
        var groupkey;
        groupkey = this[keyName];
        var currentGroup = groupByKey[groupkey];
        if (!currentGroup) {
            groupByKey[groupkey] = [];
        }
        groupByKey[groupkey].push(this);
    });
    var groupArray = [];
    $(groupByKey).each(function (index, value) {
        if (!(value == null)) groupArray.push(this);
    });

    return groupArray;
>>>>>>> origin/master
}
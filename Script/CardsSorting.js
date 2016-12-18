
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
}
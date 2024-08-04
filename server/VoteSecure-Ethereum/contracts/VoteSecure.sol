// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteSecure {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Vote {
        address voter;
        uint candidateId;
        string receiptHash;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    mapping(address => Vote) public votes;
    uint public candidatesCount;

    event votedEvent (
        uint indexed candidateId,
        address indexed voter,
        string receiptHash
    );

    constructor() {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId, string memory _receiptHash) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        votes[msg.sender] = Vote(msg.sender, _candidateId, _receiptHash);

        emit votedEvent(_candidateId, msg.sender, _receiptHash);
    }
}

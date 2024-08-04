const VoteSecure = artifacts.require("VoteSecure");

module.exports = function (deployer) {
  deployer.deploy(VoteSecure);
};

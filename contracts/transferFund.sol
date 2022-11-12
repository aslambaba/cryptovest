// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract TransferFund {
    uint transactionCount = 0;
    struct TransactionRecord {
        uint BlockNum;
        address SenderAddress;
        address RecieverAddress;
        uint EthAmount;
        uint TimeStamp;
        string TxHash;
    }
    TransactionRecord[] transactions;

    function NewTransaction(
        address _from,
        address _to,
        uint amount,
        string memory _txHash
    ) public {
        transactions.push(
            TransactionRecord({
                BlockNum: block.number,
                SenderAddress: _from,
                RecieverAddress: _to,
                EthAmount: amount,
                TimeStamp: block.timestamp,
                TxHash: _txHash
            })
        );
        transactionCount += 1;
    }

    function GetTransactions()
        public
        view
        returns (TransactionRecord[] memory)
    {
        return transactions;
    }
}

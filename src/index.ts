import * as CryptoJS from 'crypto-js';

class Block {
	static calculateHash = (index: number, previousHash: string, data: string, timeStamp: number): string => {
		return CryptoJS.SHA256(index + previousHash + data + timeStamp).toString();
	};

	static validataStructure = (block: Block): boolean => {
		if (
			typeof block.data === 'string' &&
			typeof block.hash === 'string' &&
			typeof block.index === 'number' &&
			typeof block.previousHash === 'string' &&
			typeof block.timeStamp === 'number'
		) {
			return true;
		}
		return false;
	};

	constructor(index: number, hash: string, previousHash: string, data: string, timeStamp: number) {
		this.index = index;
		this.hash = hash;
		this.previousHash = previousHash;
		this.data = data;
		this.timeStamp = timeStamp;
	}
	public index: number;
	public hash: string;
	public previousHash: string;
	private data: string;
	public timeStamp: number;
}

const instanceBlock: Block = new Block(1, 'hashing', 'haha', 'private Data', 123123123);
const instanceBlock2: Block = new Block(2, 'hashing', 'haha', 'hello world', 435345);

let BlockChain: Block[] = [instanceBlock];

const getBlockChain = (): Block[] => BlockChain;
const getLatestBlock = (): Block => {
	return BlockChain[BlockChain.length - 1];
};

const getNewTimeStamp = (): number => {
	return Math.round(new Date().getTime() / 1000);
};

const createBlock = (data: string): Block => {
	const previousBlock: Block = getLatestBlock();
	const index: number = previousBlock.index + 1;
	const newTimeStamp: number = getNewTimeStamp();
	const previousHash: string = previousBlock.hash;
	const newHash: string = Block.calculateHash(index, previousHash, data, newTimeStamp);

	const newBlock: Block = new Block(index, newHash, previousHash, data, newTimeStamp);

	return newBlock;
};

const validateBlock = (candidate: Block, previousBlock: Block): Boolean => {
	if (!Block.validataStructure(candidate)) {
		return false;
	} else if (previousBlock.index + 1 !== candidate.index) {
		return false;
	} else if (previousBlock.hash !== candidate.previousHash) {
		return false;
	}
};

console.log(createBlock('hello!!'), createBlock('aaa'));
export {};

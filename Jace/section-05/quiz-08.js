/*
모든 아나그램 찾기(해쉬, 투포인터, 슬라이딩 윈도우)

S문자열에서 T문자열과 아나그램이 되는 S의 부분문자열의 개수를 구하는 프로그램을 작성하세요. 아나그램 판별시 대소문자가 구분됩니다.
부분문자열은 연속된 문자열이어야 합니다.

▣ 입력설명
첫 줄에 첫 번째 S문자열이 입력되고, 두 번째 줄에 T문자열이 입력됩니다. 
S문자열의 길이는 10,000을 넘지 않으며, T문자열은 S문자열보다 길이가 작거나 같습니다.

▣ 출력설명
S단어에 T문자열과 아나그램이 되는 부분문자열의 개수를 출력합니다.

▣ 입력예제 1 
bacaAacba
abc
▣ 출력예제 1
3
*/

const printAnagramNumbers = (strOne, strTwo) => {
	const strOneMap = new Map()
	const strTwoMap = new Map()
	let count = 0

	strTwo.split('').forEach((letter) => {
		addElementToMap(strTwoMap, letter)
	})

	const size = strTwo.length

	for (let i = 0; i < size; ++i) {
		const letter = strOne[i]

		addElementToMap(strOneMap, letter)
	}

	if (isAnagram(strOneMap, strTwoMap)) {
		++count
	}

	for (let i = size; i < strOne.length; ++i) {
		const letter = strOne[i]

		addElementToMap(strOneMap, letter)
		deleteElementInMap(strOneMap, strOne[i - size])

		if (isAnagram(strOneMap, strTwoMap)) {
			++count
		}
	}

	return count
}

const isAnagram = (mapOne, mapTwo) => {
	for (let letter of mapOne.keys()) {
		if (mapOne.get(letter) !== mapTwo.get(letter)) {
			return false
		}
	}
	return true
}

const addElementToMap = (map, element) => {
	if (map.get(element)) {
		map.set(element, map.get(element) + 1)
	} else {
		map.set(element, 1)
	}
}

const deleteElementInMap = (map, element) => {
	map.delete(element)
}

console.log(printAnagramNumbers('bacaAacba', 'abc'))

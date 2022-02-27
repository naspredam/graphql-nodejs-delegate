import { getIds } from '@core/repository'

describe('Suite to test repository cases', () => {

    it('should return when group is 1 which 1 and 4 are expected as a response', () => {
        const ids = getIds(1);

        expect(ids).toStrictEqual(['1', '4']);
    });

    it('should return when group is 2 which 2 and 5 are expected as a response', () => {
        const ids = getIds(2);

        expect(ids).toStrictEqual(['2', '5']);
    });

    it('should return when group is greather than 3, 4 as first to be on this condition, to be always only 8', () => {
        const ids = getIds(4);

        expect(ids).toStrictEqual(['8']);
    });

    it('should return when group is greather than 3 to be always only 8', () => {
        const ids = getIds(10);

        expect(ids).toStrictEqual(['8']);
    });

});
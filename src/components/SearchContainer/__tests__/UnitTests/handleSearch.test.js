// File: src/components/SearchContainer/__tests__/handleSearch.test.js

// mocks
jest.mock('../../fetchQueryTracks');
jest.mock('../../../../context/QueryContext/QueryContext', () => ({
    useQuery: jest.fn()
}));
jest.mock('../../../../context/SearchResultsContext/SearchResultsContext', () => ({
    useSearchTracks: jest.fn()
}));

import { render, screen, fireEvent } from '@testing-library/react';
import SearchContainer from '../../SearchContainer';
import fetchQueryTracks from '../../fetchQueryTracks';
import { useQuery } from '../../../../context/QueryContext/QueryContext';
import { useSearchTracks } from '../../../../context/SearchResultsContext/SearchResultsContext';

// mock variables
const mockSetQuery = jest.fn();
const mockSetSearchTracks = jest.fn();
const sampleTracks = [
    {
        "trackId": "5O4erNlJ74PIF6kGol1ZrC",
        "trackName": "Could You Be Loved",
        "trackArtist1Name": "Bob Marley & The Wailers",
        "trackArtist1Id": "2QsynagSdAqZj3U9HgDzjD",
        "preview_url": ""
    },
    {
        "trackId": "7yFvSYKk3g5g8e7Ffl16ws",
        "trackName": "Three Little Birds",
        "trackArtist1Name": "Bob Marley & The Wailers",
        "trackArtist1Id": "2QsynagSdAqZj3U9HgDzjD",
        "preview_url": ""
    },
    {
        "trackId": "7vggqxNKwd6xdRoYS0pQtM",
        "trackName": "Three Little Birds",
        "trackArtist1Name": "Bob Marley & The Wailers",
        "trackArtist1Id": "2QsynagSdAqZj3U9HgDzjD",
        "preview_url": ""
    },
    {
        "trackId": "0QyBdoz2JktWEo111DBEx9",
        "trackName": "Buffalo Soldier",
        "trackArtist1Name": "Bob Marley & The Wailers",
        "trackArtist1Id": "2QsynagSdAqZj3U9HgDzjD",
        "preview_url": ""
    },
    {
        "trackId": "3h5TiWTqGxjSjFrbruPFH9",
        "trackName": "Praise Jah In The Moonlight",
        "trackArtist1Name": "YG Marley",
        "trackArtist1Id": "0n4Fao9kbjgM76RmVlfSwr",
        "preview_url": "https://p.scdn.co/mp3-preview/48ba1ac7cb410b8e0f8abbb33cab0122e33786b5?cid=e1f18649e0d34c5598d545cc48487593"
    },
    {
        "trackId": "4aUCPal9bxTnQkEfdIY6sG",
        "trackName": "Jamming",
        "trackArtist1Name": "Bob Marley & The Wailers",
        "trackArtist1Id": "2QsynagSdAqZj3U9HgDzjD",
        "preview_url": ""
    },
    {
        "trackId": "2V2by56rK60UxMHPtG02OJ",
        "trackName": "One Love",
        "trackArtist1Name": "Bob Marley & The Wailers",
        "trackArtist1Id": "2QsynagSdAqZj3U9HgDzjD",
        "preview_url": ""
    },
    {
        "trackId": "19gEmPjfqSZT0ulDRfjl0m",
        "trackName": "Hot N*gga",
        "trackArtist1Name": "Bobby Shmurda",
        "trackArtist1Id": "34Y0ldeyUv7jBvukWOGASO",
        "preview_url": "https://p.scdn.co/mp3-preview/5131754170f315eb19b3fad75db4b6d8c38e2278?cid=e1f18649e0d34c5598d545cc48487593"
    },
    {
        "trackId": "6kTwzV93qpcovlRPmBOXmn",
        "trackName": "World Hold On - FISHER Rework",
        "trackArtist1Name": "Bob Sinclar",
        "trackArtist1Id": "5YFS41yoX0YuFY39fq21oN",
        "preview_url": "https://p.scdn.co/mp3-preview/4cd3cb209c459ca66e0df9974d3265ae99a713bd?cid=e1f18649e0d34c5598d545cc48487593"
    },
    {
        "trackId": "1B9aTwGAtuoUNlX8eJ2qpe",
        "trackName": "Love Song 28",
        "trackArtist1Name": "Jullian Gomes",
        "trackArtist1Id": "1GG3lCU6RzggGm6w5GRQBi",
        "preview_url": "https://p.scdn.co/mp3-preview/f0e1b50674e66b3b343b9ac2824bef5083888080?cid=e1f18649e0d34c5598d545cc48487593"
    },
    {
        "trackId": "12yx1rwysCbdWNxcc3pi7H",
        "trackName": "2 Bob",
        "trackArtist1Name": "Malaika",
        "trackArtist1Id": "4MGdpmr2NJjQdJYkkimg7b",
        "preview_url": "https://p.scdn.co/mp3-preview/8b03856d603b340d38032d5ddfc4a76213329334?cid=e1f18649e0d34c5598d545cc48487593"
    },
    {
        "trackId": "1lrDSi7wdnJHoEw79CwIxt",
        "trackName": "BOBOJANE",
        "trackArtist1Name": "Gusba Banana",
        "trackArtist1Id": "0JQngxUcKlWPmUklxDidWb",
        "preview_url": "https://p.scdn.co/mp3-preview/cbaf94b9696427bbea26157bfb73e359e61f24e9?cid=e1f18649e0d34c5598d545cc48487593"
    }
];

describe('SearchContainer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should alert when query is empty', async () => {
        useQuery.mockReturnValue({ query: '', setQuery: mockSetQuery });
        useSearchTracks.mockReturnValue({ setSearchTracks: mockSetSearchTracks });

        global.alert = jest.fn();

        render(<SearchContainer />);

        fireEvent.click(screen.getByText('Search'));

        expect(global.alert).toHaveBeenCalledWith('Please enter something into search query');
    });

    it('should handle successful fetch and update search tracks', async () => {
        fetchQueryTracks.mockResolvedValue(sampleTracks);

        useQuery.mockReturnValue({ query: 'some query', setQuery: mockSetQuery });
        useSearchTracks.mockReturnValue({ setSearchTracks: mockSetSearchTracks });

        render(<SearchContainer />);

        fireEvent.click(screen.getByText('Search'));

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(mockSetSearchTracks).toHaveBeenCalledWith(sampleTracks);
    });

    it('should handle fetch error and alert user', async () => {
        fetchQueryTracks.mockRejectedValue(new Error('Fetch error'));

        useQuery.mockReturnValue({ query: 'some query', setQuery: mockSetQuery });
        useSearchTracks.mockReturnValue({ setSearchTracks: mockSetSearchTracks });

        global.alert = jest.fn();

        render(<SearchContainer />);

        fireEvent.click(screen.getByText('Search'));

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(global.alert).toHaveBeenCalledWith('There was a problem with the search operation. Please try again.');
    });
});

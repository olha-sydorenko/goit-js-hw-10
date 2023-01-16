import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js'
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const countryCard = document.querySelector('.country-info');
const listOfCountries = document.querySelector('.country-list');




const onSearchInput = event => {
    const country = event.target.value.trim();
    fetchCountries(country).then(countries => {
        if (countries.length === 1) {
        renderCountryCard(countries);
    } else if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
    } else {
        renderListOfCountries(countries);
    }
        
    }).catch(error => {
        if (error.message === '404') {
            Notify.failure('Oops, there is no country with that name');
            listOfCountries.innerHTML = '';
            countryCard.innerHTML = '';
        }
    })
}

const textInput = document.querySelector('#search-box');
textInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function renderCountryCard(countries) {
    const markup = countries.map(country => {
    return `<div> 
    <img src = '${country.flags.svg}' alt = 'flag' width = '50'>
    <h1>${country.name.official}</h1>
    <p class='text'>Capital: ${country.capital}</p>
    <p class='text'>Population: ${country.population}</p>
    <p class='text'>Languages: ${Object.values(country.languages)}</p>
    </div>`   
}).join('');
countryCard.innerHTML = markup;
listOfCountries.innerHTML = '';
}

function renderListOfCountries(countries) {
    const listMarkup = countries.map(country => {
        return `<li style = 'list-style: none; display: flex; gap: 10px'>
        <img src = '${country.flags.svg}' alt = 'flag' width = '50'>
        <p>${country.name.official}</p>
        </li>`
    }).join('');
    listOfCountries.innerHTML = listMarkup;
    countryCard.innerHTML = '';
}


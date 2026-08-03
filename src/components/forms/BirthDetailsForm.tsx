import React, { useState, useEffect, useMemo } from 'react';
import { BirthDetails } from '../../types';
import { useReport } from '../../context/ReportContext';

import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { fetchReportFull, ReportApiRequest } from '../../api/reportApi';
import fallBackReport from '../../mocks/fallBackReport.json';

import CustomSelect from '../ui/CustomSelect';
import { fetchCountries, searchLocation } from '../../api/locationApi';
import { getTimezoneCountryName } from '../../utils/locationCurrencyUtils';

const MONTHS = [
  { name: 'Jan', val: '1' },
  { name: 'Feb', val: '2' },
  { name: 'Mar', val: '3' },
  { name: 'Apr', val: '4' },
  { name: 'May', val: '5' },
  { name: 'Jun', val: '6' },
  { name: 'Jul', val: '7' },
  { name: 'Aug', val: '8' },
  { name: 'Sep', val: '9' },
  { name: 'Oct', val: '10' },
  { name: 'Nov', val: '11' },
  { name: 'Dec', val: '12' }
];

export const BirthDetailsForm: React.FC = () => {
  const { submitBirthDetails, isLoading } = useReport();
  const navigate = useNavigate();

  // Form local states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [gender, setGender] = useState('');
  const [day, setDay] = useState('1');
  const [month, setMonth] = useState('1');
  const [year, setYear] = useState('2026');
  const [hour12, setHour12] = useState('12');
  const [minute, setMinute] = useState('0');
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [country, setCountry] = useState(getTimezoneCountryName());
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Unknown');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [allCountries, setAllCountries] = useState<{ value: string; label: string }[]>([]);
  const [apiCities, setApiCities] = useState<{ name: string; displayName: string; stateName: string; lat: number; lng: number }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isValidCity, setIsValidCity] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();
        // Astroved API may return an array directly or an object with a "Countries" array
        let countriesArray = [];
        if (Array.isArray(data)) {
          countriesArray = data;
        } else if (data && Array.isArray(data.Countries)) {
          countriesArray = data.Countries;
        }

        if (countriesArray.length > 0) {
          const formatted = countriesArray.map((c: any) => {
            const name = c.CountryName1 || c.CountryName || 'Unknown';
            return { value: name, label: name };
          });
          setAllCountries(formatted);
        } else {
          // fallback
          const defaultCountry = getTimezoneCountryName();
          setAllCountries([{ value: defaultCountry, label: defaultCountry }]);
        }
      } catch (error) {
        console.error("Failed to load countries", error);
        const defaultCountry = getTimezoneCountryName();
        setAllCountries([{ value: defaultCountry, label: defaultCountry }]);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    if (!country || !city || city.length < 3) {
      setApiCities([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchLocation(city, country);
        if (!results || results.length === 0) {
          setApiCities([]);
          return;
        }

        const formattedCities = results.map((item: any) => ({
          name: item.City || item.name || item.display_name?.split(',')[0],
          displayName: item.City
            ? `${item.City}, ${item.StateorProvince ? item.StateorProvince + ', ' : ''}${item.Country}`
            : item.display_name,
          stateName: item.StateorProvince || 'Unknown',
          lat: item.Latitude ? parseFloat(item.Latitude) : 0,
          lng: item.Longitude ? parseFloat(item.Longitude) : 0
        }));

        const uniqueCities = Array.from(new Map(formattedCities.map((item: any) => [item.displayName, item])).values()) as { name: string, displayName: string, stateName: string, lat: number, lng: number }[];
        setApiCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [city, country]);

  // Dynamic Calendar Validation
  const maxDays = month
    ? new Date(year ? Number(year) : 2026, Number(month), 0).getDate()
    : 31;
  const days = Array.from({ length: maxDays }, (_, i) => String(i + 1));

  useEffect(() => {
    if (day && Number(day) > maxDays) {
      setDay(String(maxDays));
    }
  }, [maxDays, day]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => String(currentYear - i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');

    if (!gender) {
      alert("Please select a gender.");
      return;
    }

    if (country && (!city || !isValidCity)) {
      alert("Please select a valid city from the suggested list.");
      return;
    }

    let finalHour = Number(hour12);
    if (ampm === 'PM' && finalHour < 12) finalHour += 12;
    if (ampm === 'AM' && finalHour === 12) finalHour = 0;

    const selectedDate = new Date(Number(year), Number(month) - 1, Number(day), finalHour, Number(minute));
    if (selectedDate > new Date()) {
      alert("Future date and time are not allowed.");
      return;
    }

    const birthData: BirthDetails = {
      name: name.trim(),
      email: email.trim(),
      gender,
      day: Number(day),
      month: Number(month),
      year: Number(year),
      hour: finalHour,
      minute: Number(minute),
      country,
      city: city.trim() || 'New Delhi',
      latitude,
      longitude,
      language
    };

    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const formattedHour = String(finalHour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');
    const datetime_local = `${year}-${formattedMonth}-${formattedDay}T${formattedHour}:${formattedMinute}:00`;

    const apiPayload: ReportApiRequest = {
      name: name.trim(),
      email: email.trim(),
      gender,
      datetime_local,
      city: city.trim(),
      state: stateName,
      country: country,
      latitude: latitude,
      longitude: longitude,
      ayanamsa: 'LAHIRI',
      house_system: 'WHOLE_SIGN'
    };

    // console.log('Sending birth data to API:', apiPayload);
    navigate('/generating');

    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 6000));
    let apiResponseData = null;

    let apiError: any = null;
    const fetchApiTask = (async () => {
      try {
        const response = await fetchReportFull(apiPayload);
        apiResponseData = response;
      } catch (error) {
        console.error('API Error:', error);
        apiError = error;
      }
    })();

    await Promise.all([
      fetchApiTask,
      minLoadingTime
    ]);

    if (apiError) {
      await submitBirthDetails(birthData, null, apiError);
    } else {
      await submitBirthDetails(birthData, apiResponseData);
      navigate('/report/welcome');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-2xl overflow-visible max-w-md w-full mx-auto lg:ml-auto lg:mr-0 flex flex-col max-h-full self-center"
    >
      <div className="bg-orange-500 py-3 text-center rounded-t-2xl">
        <h3 className="text-white font-semibold text-[17px] tracking-wide uppercase">KUNDALI</h3>
      </div>

      <div className="p-4 md:p-5 lg:p-6 space-y-3 lg:space-y-4 relative flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 tracking-tight leading-none">
              Enter Your Birth Details
            </h2>
            <p className="text-gray-500 text-sm mt-2 font-medium">
              Get your personalized Kundali report with accurate predictions.
            </p>
          </div>

          {/* Language Selector */}
          {/* <div className="relative mt-1">
            <label id="lang-label" htmlFor="lang-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
              Language
            </label>
            <div className="relative">
              <CustomSelect
                id="lang-select"
                aria-labelledby="lang-label"
                value={language}
                onChange={(val) => setLanguage(val as 'english' | 'hindi')}
                options={[{ value: 'english', label: 'English' }, { value: 'hindi', label: 'Hindi' }]}
                className="!pl-3 !pr-8 !py-2 !text-sm border-gray-200 rounded-lg"
              />
            </div>
          </div> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Row: Name and Gender */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="relative">
              <label htmlFor="name-input" className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                Full Name
              </label>
              <input
                id="name-input"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setName(val);
                }}
                className="w-full px-4 py-3 text-sm text-gray-800 font-medium placeholder-gray-500 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                placeholder="Your Name"
              />
            </div>

            <div className="relative">
              <label id="gender-label" htmlFor="gender-select" className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                Gender
              </label>
              <div className="relative">
                <CustomSelect
                  id="gender-select"
                  aria-labelledby="gender-label"
                  required
                  value={gender}
                  onChange={(val) => setGender(val)}
                  placeholder="Select Gender"
                  options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    { value: 'Other', label: 'Other' }
                  ]}
                  className="!pl-4 !pr-8 !py-3 !text-sm border-gray-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div className="grid grid-cols-1 gap-3 pt-1">
            <div className="relative mt-1">
              <label htmlFor="email-input" className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                Email Address
              </label>
              <input
                id="email-input"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                className={`w-full px-4 py-3 text-sm text-gray-800 font-medium placeholder-gray-500 border ${emailError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-indigo-400'} rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-400`}
                placeholder="Your Email"
              />
              {emailError && <p className="text-[10px] text-red-500 absolute -bottom-4 left-2">{emailError}</p>}
            </div>
          </div>

          {/* Day / Month / Year Dropdowns */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
            <div className="relative">
              <label id="day-label" htmlFor="day-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                Day
              </label>
              <div className="relative">
                <CustomSelect
                  id="day-select"
                  aria-labelledby="day-label"
                  required
                  value={day}
                  onChange={(val) => setDay(val)}
                  placeholder="Day"
                  options={days}
                  className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div className="relative">
              <label id="month-label" htmlFor="month-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                Month
              </label>
              <div className="relative">
                <CustomSelect
                  id="month-select"
                  aria-labelledby="month-label"
                  required
                  value={month}
                  onChange={(val) => setMonth(val)}
                  placeholder="Month"
                  options={MONTHS.map(m => ({ value: m.val, label: m.name }))}
                  className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div className="relative">
              <label id="year-label" htmlFor="year-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                Year
              </label>
              <div className="relative">
                <CustomSelect
                  id="year-select"
                  aria-labelledby="year-label"
                  required
                  value={year}
                  onChange={(val) => setYear(val)}
                  placeholder="Year"
                  options={years}
                  className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Time of Birth */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
            <div className="relative">
              <label id="hour-label" htmlFor="hour-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                Hour
              </label>
              <div className="relative">
                <CustomSelect
                  id="hour-select"
                  aria-labelledby="hour-label"
                  required
                  value={hour12}
                  onChange={(val) => setHour12(val)}
                  placeholder="Hour"
                  options={Array.from({ length: 12 }, (_, i) => {
                    const h = i === 0 ? 12 : i;
                    return { value: String(h), label: String(h).padStart(2, '0') };
                  })}
                  className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div className="relative">
              <label id="minute-label" htmlFor="minute-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                Minute
              </label>
              <div className="relative">
                <CustomSelect
                  id="minute-select"
                  aria-labelledby="minute-label"
                  required
                  value={minute}
                  onChange={(val) => setMinute(val)}
                  placeholder="Min"
                  options={Array.from({ length: 60 }, (_, i) => ({ value: String(i), label: String(i).padStart(2, '0') }))}
                  className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div className="relative">
              <label id="ampm-label" htmlFor="ampm-select" className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                AM / PM
              </label>
              <div className="relative">
                <CustomSelect
                  id="ampm-select"
                  aria-labelledby="ampm-label"
                  required
                  value={ampm}
                  onChange={(val) => setAmpm(val as 'AM' | 'PM')}
                  placeholder="AM/PM"
                  options={[{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }]}
                  className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Row: Country and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 relative z-40">
            <div className="relative">
              <label id="country-label" htmlFor="country-select" className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                Country
              </label>
              <div className="relative">
                <CustomSelect
                  id="country-select"
                  aria-labelledby="country-label"
                  required
                  searchable
                  searchPlaceholder="Search country..."
                  placement="top"
                  value={country}
                  onChange={(val) => {
                    setCountry(val);
                    setCity('');
                    setIsValidCity(false);
                  }}
                  placeholder="Select Country"
                  options={allCountries.length > 0 ? allCountries : [{ value: 'India', label: 'India' }]}
                  className="!pl-4 !pr-8 !py-3 !text-sm border-gray-200 rounded-xl"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="city-input" className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-indigo-600 font-normal tracking-wide z-10">
                City
              </label>
              <div className="relative">
                <input
                  id="city-input"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^A-Za-z\s]/g, '');
                    setCity(val);
                    setIsValidCity(false);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  disabled={!country}
                  placeholder="Type your city"
                  className="w-full pl-4 pr-8 py-3 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 cursor-text relative z-0 disabled:opacity-50"
                  autoComplete="off"
                />
                <AnimatePresence>
                  {showSuggestions && city.length >= 3 && (
                    <motion.ul
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute left-0 right-0 bottom-full z-50 mb-1 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl py-1 custom-scrollbar"
                    >
                      {isSearching ? (
                        <li className="px-4 py-3 text-sm text-gray-500 font-medium flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Searching for "{city}"...
                        </li>
                      ) : apiCities.length > 0 ? (
                        apiCities.map((c, idx) => (
                          <li
                            key={`${c.name}-${idx}`}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setCity(c.name);
                              setStateName(c.stateName);
                              setLatitude(c.lat);
                              setLongitude(c.lng);
                              setIsValidCity(true);
                              setShowSuggestions(false);
                            }}
                            className="px-4 py-2 text-sm text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                          >
                            <span className="block font-bold text-gray-900">{c.name}</span>
                            <span className="block text-[10px] text-gray-500 truncate mt-0.5">{c.displayName}</span>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-3 text-sm text-gray-500 font-medium text-center">
                          No cities found. Please check spelling.
                        </li>
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-medium text-[15px] md:text-[15px] lg:text-base whitespace-nowrap rounded-xl shadow-lg transition-all duration-200 cursor-pointer text-center flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Create Your Kundali Report Now</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

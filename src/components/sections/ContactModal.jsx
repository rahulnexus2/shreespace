{/*

import { useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';
import messageService from '../../api/services/messageService';
import userService from '../../api/services/userService';
import { FALLBACK_MESSAGE_TYPES } from '../../utils/constants';

const initialForm = {
  text: '',
  messageType: '',
  rate: 0,
  userDto: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  },
};

const RATING_TYPES = ['Testimonial', 'Feedback'];

const StarRating = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-colors cursor-pointer bg-transparent border-0 p-0 leading-none"
        >
          <span
            className={
              star <= (hovered || value)
                ? 'text-yellow-400'
                : 'text-neutral-300 dark:text-neutral-600'
            }
          >
            ★
          </span>
        </button>
      ))}
      {value > 0 && (
        <span className="text-xs text-neutral-500 dark:text-neutral-400 self-center ml-1">
          {value}/5
        </span>
      )}
    </div>
  );
};

const ContactModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);

  const { data: rawTypes, loading: typesLoading, execute: fetchTypes } = useApi(messageService.getTypes);
  const { loading: saving, error: saveError, execute: saveMessage } = useApi(messageService.save);

  const types = rawTypes?.length ? rawTypes : FALLBACK_MESSAGE_TYPES;

  const showRating = RATING_TYPES.some(
    (t) => t.toLowerCase() === form.messageType.toLowerCase()
  );

  useEffect(() => {
    if (isOpen) {
      fetchTypes();
      setSuccess(false);
      setForm(initialForm);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

 const handleChange = (e) => {
  const { name, value } = e.target;
  if (['firstName', 'lastName', 'email', 'phoneNumber'].includes(name)) {
    setForm((prev) => ({
      ...prev,
      userDto: { ...prev.userDto, [name]: value },
    }));
    return;
  }
  if (name === 'messageType') {
    const isRatingType = RATING_TYPES.some(
      (t) => t.toLowerCase() === value.toLowerCase()
    );
    setForm((prev) => ({ ...prev, [name]: value, rate: isRatingType ? prev.rate : 0 })); // ✅ prev.rate not prev.rating
    return;
  }
  setForm((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (saving) return;

  try {
    const messagePayload = {
      text: form.text,
      messageType: form.messageType,
      rate: showRating ? form.rate : 0,
      userDto: {
        firstName: form.userDto.firstName,
        lastName: form.userDto.lastName,
        email: form.userDto.email,
        phoneNumber: form.userDto.phoneNumber,
      },
    };

    const userPayload = {
      firstName: form.userDto.firstName,
      lastName: form.userDto.lastName,
      email: form.userDto.email,
      phoneNumber: form.userDto.phoneNumber,
    };
      console.log('user payload:', userPayload);

    console.log('Submitting payload:', messagePayload); // 👈 verify in console

    const [messageRes, userRes] = await Promise.all([
      saveMessage(messagePayload),
      userService.createUsers(userPayload),
    ]);

   if (messageRes && userRes) {
      setSuccess(true);
    }
  } catch (err) {
    console.error('Submit error:', err);
  }
};

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl w-full max-w-lg relative">

       
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
        >
          ✕
        </button>

        {success ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="w-12 h-12 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 text-xl mb-4">
              ✓
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              Message sent!
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <div className="p-8">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
              Send us a message
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
              We'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    First name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    value={form.userDto.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    value={form.userDto.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

             
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.userDto.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Mobile number
                  </label>
                  <input
                    name="phoneNumber"
                    type="text"
                    inputMode='numeric'
                    value={form.userDto.phoneNumber}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    pattern="[+]?[0-9\s\-]{7,15}"
                    autoComplete='off '
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

              
              <div className="mb-3">
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  Message type
                </label>
                <select
                  name="messageType"
                  value={form.messageType}
                  onChange={handleChange}
                  required
                  disabled={typesLoading}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white outline-none focus:border-neutral-900 dark:focus:border-white transition-colors appearance-none cursor-pointer disabled:opacity-50"
                >
                  <option value="" disabled>
                    {typesLoading ? 'Loading...' : 'Select type'}
                  </option>
                  {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

            
              {showRating && (
                <div className="mb-3">
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Rating
                  </label>
                  <div className="px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                    <StarRating
                      value={form.rate}
                      onChange={(val) => setForm((prev) => ({ ...prev, rate: val }))}
                    />
                  </div>
                </div>
              )}

             
              <div className="mb-5">
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  Message
                </label>
                <textarea
                  name="text"
                  value={form.text}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  required
                  rows={4}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors resize-none"
                />
              </div>

              
              {saveError && (
                <p className="text-xs text-red-500 mb-3">{saveError}</p>
              )}

              
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer border-0 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? 'Sending...' : 'Send message'}
              </button>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
*/}

import { useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';
import messageService from '../../api/services/messageService';
import userService from '../../api/services/userService';

// ─── Constants ────────────────────────────────────────────────────────────────

const RATING_TYPES = ['testimonial', 'feedback'];

const TYPE_CONFIG = {
  TESTIMONIAL: {
    title: 'Share your testimonial',
    subtitle: 'We love to hear what you think about us.',
    placeholder: 'Share your experience with us...',
    showRating: true,
  },
  FEEDBACK: {
    title: 'Give us feedback',
    subtitle: 'Help us improve with your honest feedback.',
    placeholder: 'What can we do better?',
    showRating: true,
  },
  QUERY: {
    title: 'Send us a query',
    subtitle: 'We wll get back to you within 24 hours.',
    placeholder: 'Describe your question or concern...',
    showRating: false,
  },
};

const initialForm = {
  text: '',
  rate: 0,
  userDto: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  },
};

// ─── Star Rating ──────────────────────────────────────────────────────────────

const StarRating = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-colors cursor-pointer bg-transparent border-0 p-0 leading-none"
        >
          <span
            className={
              star <= (hovered || value)
                ? 'text-yellow-400'
                : 'text-neutral-300 dark:text-neutral-600'
            }
          >
            ★
          </span>
        </button>
      ))}
      {value > 0 && (
        <span className="text-xs text-neutral-500 dark:text-neutral-400 self-center ml-1">
          {value}/5
        </span>
      )}
    </div>
  );
};

// ─── ContactModal ─────────────────────────────────────────────────────────────

/**
 * Props:
 *   isOpen   {boolean}
 *   onClose  {() => void}
 *   type     {'Testimonial' | 'Feedback' | 'Query'}
 */
const ContactModal = ({ isOpen, onClose, type = 'Query' }) => {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);

  const { loading: saving, error: saveError, execute: saveMessage } = useApi(messageService.save);

  const safeType = (type ?? 'Query').toUpperCase();
  const config = TYPE_CONFIG[safeType] ?? TYPE_CONFIG.QUERY;
  const showRating = RATING_TYPES.includes(safeType.toLowerCase());

  // Reset form whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setForm(initialForm);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['firstName', 'lastName', 'email', 'phoneNumber'].includes(name)) {
      setForm((prev) => ({
        ...prev,
        userDto: { ...prev.userDto, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    try {
      const messagePayload = {
        text: form.text,
        messageType: type.toUpperCase(),
        rate: showRating ? form.rate : 0,
        userDto: { ...form.userDto },
      };

      const userPayload = { ...form.userDto };

      const [messageRes, userRes] = await Promise.all([
        saveMessage(messagePayload),
        userService.createUsers(userPayload),
      ]);

      if (messageRes && userRes) setSuccess(true);
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl w-full max-w-lg relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
        >
          ✕
        </button>

        {success ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="w-12 h-12 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 text-xl mb-4">
              ✓
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              Message sent!
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {config.subtitle}
            </p>
          </div>
        ) : (
          <div className="p-8">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
              {config.title}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
              {config.subtitle}
            </p>

            <form onSubmit={handleSubmit}>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    First name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    value={form.userDto.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    value={form.userDto.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Email + Phone row */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.userDto.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Mobile number
                  </label>
                  <input
                    name="phoneNumber"
                    type="text"
                    inputMode="numeric"
                    value={form.userDto.phoneNumber}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    pattern="[+]?[0-9\s\-]{7,15}"
                    autoComplete="off"
                    className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Star rating — only for Testimonial / Feedback */}
              {showRating && (
                <div className="mb-3">
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Rating
                  </label>
                  <div className="px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                    <StarRating
                      value={form.rate}
                      onChange={(val) => setForm((prev) => ({ ...prev, rate: val }))}
                    />
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  Message
                </label>
                <textarea
                  name="text"
                  value={form.text}
                  onChange={handleChange}
                  placeholder={config.placeholder}
                  required
                  rows={4}
                  className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors resize-none"
                />
              </div>

              {/* Error */}
              {saveError && (
                <p className="text-xs text-red-500 mb-3">{saveError}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer border-0 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? 'Sending...' : `Send ${type}`}
              </button>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
# Ryden's 1st Birthday Invitation Website 🎉

A beautiful, modern, and interactive birthday invitation website featuring a Stitch (Lilo & Stitch) theme for Ryden's 1st birthday celebration!

## Features ✨

- **Stitch Theme**: Blue and pink color scheme inspired by the beloved Disney character
- **Shadow Fonts**: Eye-catching text with multiple shadow effects and gradients
- **Modern Design**: Clean, responsive layout with glassmorphism effects
- **Interactive Elements**:
  - Sparkle trail that follows your mouse
  - Confetti animation on RSVP button click
  - Floating tropical elements (flowers, balloons, stars)
  - 3D tilt effect on hover
  - Smooth scroll animations
- **Animated Background**: Dynamic gradient with twinkling stars
- **Photo Carousel**: Automatic slideshow with multiple photos
  - Auto-scrolls every 3.5 seconds
  - Navigation dots to jump to specific photos
  - Pauses on hover
  - Smooth sliding animations
- **Fully Responsive**: Works beautifully on mobile, tablet, and desktop

## Setup Instructions 📝

### 1. Add Your Photo
Add multiple photos to create an automatic carousel:
- Save your photos as `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, etc. in the same folder
- The carousel will automatically scroll through your photos every 3.5 seconds
- Add more photos by copying this section in `index.html` (around line 61):
  ```html
  <div class="carousel-slide">
      <img src="photo5.jpg" alt="Ryden Photo 5" class="birthday-photo">
  </div>
  ```
- You can add as many photos as you want!
- Click the dots at the bottom to manually navigate
- Hover over photos to pause auto-scrolling

### 2. Update Party Details
Edit `index.html` and replace the bracketed placeholders:
- **Date**: Line 68 - Replace `[Your Date Here]`
- **Time**: Line 76 - Replace `[Your Time Here]`
- **Location**: Line 84 - Replace `[Your Venue Here]`
- **RSVP Deadline**: Line 104 - Replace `[RSVP Date]`

### 3. Configure RSVP Button
The RSVP button currently opens an email client. You can customize this in `script.js` (line 72-83):

**Option A - Email** (current setup):
```javascript
const email = 'your-email@example.com'; // Add your email
```

**Option B - WhatsApp**:
```javascript
const phone = '1234567890'; // Your phone number
const message = encodeURIComponent("I'd like to RSVP for Ryden's birthday!");
window.location.href = `https://wa.me/${phone}?text=${message}`;
```

**Option C - Google Form**:
```javascript
window.location.href = 'YOUR_GOOGLE_FORM_URL';
```

## How to View 🌐

1. **Local Viewing**: Simply open `index.html` in any web browser
2. **Online Hosting**: Upload all files to:
   - GitHub Pages (free)
   - Netlify (free)
   - Vercel (free)
   - Any web hosting service

## File Structure 📁

```
Ryden_birthday_invitation/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Interactive features
├── photo1.jpg          # Your photos (to be added)
├── photo2.jpg
├── photo3.jpg
├── photo4.jpg
├── ...more photos...
└── README.md          # This file
```

## Customization Tips 🎨

### Change Colors
Edit the CSS variables in `styles.css` (lines 7-14):
```css
:root {
    --stitch-blue: #4A90E2;
    --stitch-pink: #FF69B4;
    /* etc... */
}
```

### Adjust Text Shadows
The shadow fonts use multiple shadow layers for depth. Find and modify `text-shadow` properties in `styles.css`.

### Add More Animations
Check the `@keyframes` sections in `styles.css` to modify existing animations or create new ones.

## Browser Support 🌍

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## Credits 💙

Created with love for Ryden's special day!
Theme inspired by Disney's Stitch character.

---

**Happy 1st Birthday, Ryden! 🎂🎈**

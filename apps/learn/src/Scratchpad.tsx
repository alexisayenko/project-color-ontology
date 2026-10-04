import { useState } from 'react'

function Thumbnail({ src, alt }: { src: string; alt: string }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <img
        src={src}
        alt={alt}
        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border border-stone-200 dark:border-stone-700"
        onClick={() => setExpanded(true)}
      />
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setExpanded(false)} />
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={src} alt={alt} className="max-w-full max-h-[90vh] rounded-xl shadow-2xl" />
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-sm hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default function Scratchpad() {
  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950">
      <div className="px-8 py-10 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mb-2">Scratchpad</h2>
        <p className="text-stone-400 dark:text-stone-500 text-sm mb-8">Notes, links, images, and ideas to organize later.</p>

        <div className="space-y-6">

          {/* Oldest Cave Paintings */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Oldest Known Cave Paintings</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/cave-paintings-bbc.png" alt="Ancient cave paintings depicting human and animal figures" />
              </span>
              The oldest known cave paintings are just 35,000 years old.
              <br /><br />
              <a href="http://news.bbc.co.uk/2/hi/science/nature/733747.stm" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                BBC News: Cave paintings →
              </a>
            </div>
          </section>

          {/* HTML Color Codes — Color Wheel Tool */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">HTML Color Codes — Color Wheel Tool</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/html-color-codes-wheel.png" alt="HTML Color Codes interactive color wheel with Hex, RGB, HSL, OKLCH values and analogous palette" />
              </span>
              Interactive color wheel tool with Hex, RGB, HSL, and OKLCH values. Supports analogous, complementary, triadic, and other color scheme modes with palette export.
              <br /><br />
              <a href="https://htmlcolorcodes.com/color-wheel/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                htmlcolorcodes.com: Color Wheel →
              </a>
            </div>
          </section>

          {/* Figma — Color Meanings */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Figma — Color Meanings</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Browse a searchable list of named colors and learn about their meanings. Includes swatches like Cerulean, Pastel Orange, Green Sage, Dark Pink, Chili Red, Slate Gray, and many more.
              <br /><br />
              <a href="https://www.figma.com/colors/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Figma: Color Meanings →
              </a>
            </div>
          </section>

          {/* color-name.com — Color Name Lookup */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">color-name.com — Color Name Lookup</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Look up any hex code to find its closest color name, RGB values, and fashion/interior visualizations. Example: <strong>#40FF00</strong> → Harlequin, RGB (64, 255, 0).
              <br /><br />
              <a href="https://www.color-name.com/hex/40ff00" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                color-name.com: #40FF00 (Harlequin) →
              </a>
            </div>
          </section>

          {/* Color Wheel Basics */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Color Wheel Basics</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2 flex gap-2">
                <Thumbnail src="/assets/theory/color-wheel-basics-82.png" alt="Color wheel basics — primary, secondary, warm, cool, and complementary colors" />
                <Thumbnail src="/assets/theory/color-wheel-basics-crystal.png" alt="Crystal Color Wheel — primary, secondary, intermediate colors with color harmonies" />
              </span>
              Color wheel, primary colors, secondary colors, warm colors, cool colors, and complementary colors at a glance. The Crystal Color Wheel shows primary (red, yellow, blue), secondary (orange, green, violet), and intermediate colors with inner rings illustrating color harmonies: analogous, complementary, triadic, monochromatic, and warm/cool divisions.
              <br /><br />
              <a href="https://asowap.amebaownd.com/posts/54145147/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Source →
              </a>
            </div>
          </section>

          {/* Key Terminologies Related to Color Theory */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Key Terminologies Related to Color Theory</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/color-theory-key-terminologies.png" alt="Key terminologies related to color theory — color wheel, complementary, analogous, triadic, and tetradic colors" />
              </span>
              <p className="mb-3">
                <strong>Color Wheel:</strong> A circular diagram of colors arranged by their chromatic relationship. Includes primary colors (red, blue, yellow), secondary colors (green, orange, purple), and tertiary colors (blends like red-orange, blue-green).
              </p>
              <p className="mb-3">
                <strong>Complementary Colors:</strong> Colors directly opposite each other on the color wheel (e.g., blue &amp; orange). High contrast, visually striking when paired. Commonly used in logos and calls to action.
              </p>
              <p className="mb-3">
                <strong>Analogous Colors:</strong> Next to each other on the color wheel (e.g., blue, blue-green, green). Harmonious and pleasing. Good for softer, unified designs.
              </p>
              <p className="mb-3">
                <strong>Triadic Colors:</strong> Three colors evenly spaced around the wheel (e.g., red, yellow, blue). Balanced yet vibrant. Effective for designs needing color diversity with harmony.
              </p>
              <p className="mb-3">
                <strong>Tetradic Colors (Double Complementary):</strong> Two pairs of complementary colors (e.g., red &amp; green + blue &amp; orange). Offers rich color palettes. Best used with one dominant color and the others as accents to avoid overwhelming.
              </p>
            </div>
          </section>

          {/* Comprehensive Color Name Wheel */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Comprehensive Color Name Wheel</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/comprehensive-color-name-wheel.png" alt="Comprehensive color wheel with hundreds of named colors organized by hue and saturation" />
              </span>
              A detailed color wheel mapping hundreds of named colors — from common names like red, blue, and green to specific shades like dragon fruit, prussian blue, rhubarb leaf, and peanut butter — organized by hue angle and saturation levels.
              <br /><br />
              <a href="https://www.thealteredimagestudio.com/blog/2016/3/1/dubai-5rske" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                The Altered Image Studio →
              </a>
            </div>
          </section>

          {/* Tri-Model Color Wheel */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Tri-Model Color Wheel Chart: CMYK, RGB & RYB</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/tri-model-color-wheel.png" alt="Tri-Model Color Wheel Chart showing CMYK, RGB, and RYB with warm/cool indicators" />
              </span>
              A comprehensive color wheel chart combining all three major color models: <strong>CMYK</strong> (subtractive printing), <strong>RGB</strong> (additive light), and <strong>RYB</strong> (traditional painting). Shows primary, secondary, and tertiary colors across models with warm and cool color indicators.
              <br /><br />
              <a href="https://www.wordlayouts.com/template/tri-model-color-wheel-chart/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Word Layouts: Tri-Model Color Wheel Chart →
              </a>
            </div>
          </section>

          {/* RYB Color Wheels */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">RYB Color Wheels</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <div className="flex flex-wrap gap-2 mb-4">
                <Thumbnail src="/assets/theory/ryb-color-wheel-72.png" alt="RYB color wheel — primary, secondary, and tertiary colors labeled" />
                <Thumbnail src="/assets/theory/ryb-color-wheel-73.png" alt="Color wheel with saturation and value gradients" />
                <Thumbnail src="/assets/theory/ryb-color-wheel-74.png" alt="RYB color wheel — Paint Logs" />
                <Thumbnail src="/assets/theory/ryb-color-wheel-75.png" alt="12 colors color wheel — painted primaries and secondaries" />
                <Thumbnail src="/assets/theory/ryb-color-wheel-76.png" alt="Color wheel with primary and complementary color relationships" />
                <Thumbnail src="/assets/theory/ryb-color-wheel-77.png" alt="Itten's color wheel" />
                <Thumbnail src="/assets/theory/ryb-color-wheel-78.png" alt="RYB color wheel — primary, secondary, tertiary full spectrum" />
                <Thumbnail src="/assets/theory/ryb-color-wheel-79.png" alt="Simple 12-segment RYB color wheel" />
              </div>
            </div>
          </section>

          {/* RGB vs CMYK */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">RGB vs CMYK</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <div className="flex flex-wrap gap-2 mb-4">
                <Thumbnail src="/assets/theory/rgb-cmyk-67.png" alt="RGB additive vs CMYK subtractive — monitor colors vs printer colors" />
                <Thumbnail src="/assets/theory/rgb-cmyk-68.png" alt="CMY subtractive primaries — color wheel and Venn diagram" />
                <Thumbnail src="/assets/theory/rgb-cmyk-69.png" alt="RGB vs CMY — additive light mixing vs subtractive paint mixing" />
                <Thumbnail src="/assets/theory/rgb-cmyk-70.png" alt="CMY subtractive mixing — cyan, magenta, yellow producing blue, green, red" />
                <Thumbnail src="/assets/theory/rgb-cmyk-71.png" alt="RGB Mode vs CMYK Mode comparison — properties and differences" />
              </div>
            </div>
          </section>

          {/* Visible Spectrum and Electromagnetic Spectrum */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Visible Spectrum and Electromagnetic Spectrum</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <div className="flex flex-wrap gap-2 mb-4">
                <Thumbnail src="/assets/theory/visible-spectrum-51.png" alt="Visible spectrum wavelengths from UV to IR" />
                <Thumbnail src="/assets/theory/visible-spectrum-52.png" alt="The electromagnetic spectrum — wavelength, frequency, and energy" />
                <Thumbnail src="/assets/theory/visible-spectrum-53.png" alt="Visible spectrum within electromagnetic spectrum" />
                <Thumbnail src="/assets/theory/visible-spectrum-54.png" alt="Electromagnetic spectrum — frequency and wavelength" />
                <Thumbnail src="/assets/theory/visible-spectrum-55.png" alt="Visible spectrum — frequency in terahertz and wavelength in nm" />
                <Thumbnail src="/assets/theory/visible-spectrum-56.png" alt="Electromagnetic spectrum — cosmic rays to broadcast band with visible light detail" />
                <Thumbnail src="/assets/theory/visible-spectrum-57.png" alt="How the spectrum looks to dogs and people" />
                <Thumbnail src="/assets/theory/visible-spectrum-58.png" alt="Electromagnetic spectrum — energy and wavelength" />
                <Thumbnail src="/assets/theory/visible-spectrum-59.png" alt="Visible spectrum — ultraviolet to infrared with wavelength markers" />
                <Thumbnail src="/assets/theory/visible-spectrum-60.png" alt="The visible spectrum — wavelength in nanometers (GAM)" />
                <Thumbnail src="/assets/theory/visible-spectrum-61.png" alt="Visible light within electromagnetic spectrum — UV to IR" />
                <Thumbnail src="/assets/theory/visible-spectrum-62.png" alt="Color wavelengths — violet to red with wave patterns (University of Waikato)" />
                <Thumbnail src="/assets/theory/visible-spectrum-63.png" alt="Electromagnetic spectrum and visible light detail — UV to IR" />
                <Thumbnail src="/assets/theory/visible-spectrum-64.png" alt="Visible spectrum — wavelength in nm from 380 to 750" />
              </div>
              <p className="mb-3">
                The visible spectrum doesn't contain all the colors perceivable to the human eye since many perceivable colors such as pink, magenta and brown are mixtures of two or more wavelengths. Since colors associated with only one wavelength and not a mix of them are called <strong>spectral</strong> or <strong>pure colors</strong>, the visible spectrum can be considered as a collection of many spectral colors.
              </p>
              <p className="mb-3">
                Distinguishment of spectral colors with close wavelengths is hard for the human eye and even gets impossible for very close ones. Recognition of six colors: red, orange, yellow, green, blue and violet, in the visible spectrum has global acceptance where each covers a range of wavelengths or frequencies upon which dispute has existed.
              </p>
              <p className="mb-3">
                Other divisions have also existed for the visible spectrum. For example, <strong>Isaac Newton</strong> divided the visible spectrum into seven colors: red, orange, yellow, green, blue, indigo and violet. However, today, it is believed that Newton's indigo corresponds to what is today called blue and his blue corresponds to what is today called cyan. Also, it is suggested by some that indigo should not be regarded as a color in its own right.
              </p>
            </div>
          </section>

          {/* Color Mixing Reference Gallery */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Color Mixing Reference Gallery</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <div className="flex flex-wrap gap-2 mb-4">
                <Thumbnail src="/assets/theory/color-mixing-ref-41.png" alt="Additive vs subtractive color mixing" />
                <Thumbnail src="/assets/theory/color-mixing-ref-42.png" alt="RYB and CMY color wheels with primary and secondary colors" />
                <Thumbnail src="/assets/theory/color-mixing-ref-43.png" alt="RGB additive mixing — red, green, blue producing cyan, magenta, yellow" />
                <Thumbnail src="/assets/theory/color-mixing-ref-44.png" alt="Additive and subtractive color combinations comparison" />
                <Thumbnail src="/assets/theory/color-mixing-ref-45.png" alt="RYB color model — Encyclopaedia Britannica" />
                <Thumbnail src="/assets/theory/color-mixing-ref-46.png" alt="Main colors, color wheel, and color mixing equations" />
                <Thumbnail src="/assets/theory/color-mixing-ref-47.png" alt="Color wheel with primary, secondary, and tertiary colors" />
                <Thumbnail src="/assets/theory/color-mixing-ref-48.png" alt="Additive/subtractive mixing diagrams and detailed color wheel" />
                <Thumbnail src="/assets/theory/color-mixing-ref-49.png" alt="The Colour Wheel — primary, secondary, and tertiary colors" />
                <Thumbnail src="/assets/theory/color-mixing-ref-50.png" alt="Visible spectrum wavelengths from UV to IR" />
              </div>
            </div>
          </section>

          {/* RGB vs CMY Primary Colors */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Why Red-Yellow-Blue vs Red-Green-Blue?</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <div className="flex flex-wrap gap-2 mb-4">
                <Thumbnail src="/assets/theory/rgb-cmy-primary-36.png" alt="RGB/CMY color wheel showing primary and secondary colors" />
                <Thumbnail src="/assets/theory/rgb-cmy-primary-37.png" alt="Additive RGB and subtractive CMY color mixing diagrams" />
                <Thumbnail src="/assets/theory/rgb-cmy-primary-38.png" alt="Additive RGB and subtractive CMY color mixing diagrams" />
              </div>
              <p className="mb-3">
                The color system that best matches the human eye is the <strong>red-green-blue</strong> color system. For additive color systems like computer screens, the primary colors are red, green, and blue. For subtractive color systems like inks, the primary colors are the opposites of red, green, and blue, which are <strong>cyan, magenta, and yellow</strong>.
              </p>
              <p className="mb-3">
                The red-yellow-blue painting color system is effectively a corruption of the cyan-magenta-yellow system, since cyan is close to blue and magenta is close to red.
              </p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mb-3">Public Domain Images, source: Christopher S. Baird.</p>
              <a href="https://www.wtamu.edu/~cbaird/sq/2015/01/22/why-are-red-yellow-and-blue-the-primary-colors-in-painting-but-computer-screens-use-red-green-and-blue/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                WTAMU: Why are red, yellow, and blue the primary colors in painting but computer screens use red, green, and blue? →
              </a>
            </div>
          </section>

          {/* Historic Color Wheels and Mixing Diagrams */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Historic Color Wheels and Mixing Diagrams</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <div className="flex flex-wrap gap-2 mb-4">
                <Thumbnail src="/assets/theory/historic-color-wheel-30.png" alt="Harris's Prismatic color wheel — original" />
                <Thumbnail src="/assets/theory/historic-color-wheel-31.png" alt="Harris's Prismatic color wheel — restored" />
                <Thumbnail src="/assets/theory/historic-color-wheel-32.png" alt="Historic RYB color mixing wheel with neutral center" />
                <Thumbnail src="/assets/theory/historic-color-wheel-33.png" alt="Historic RYB color mixing wheel — restored" />
                <Thumbnail src="/assets/theory/historic-color-wheel-34.png" alt="RYB subtractive mixing — yellow, red, blue producing olive, brown, purple, slate" />
                <Thumbnail src="/assets/theory/historic-color-wheel-35.png" alt="RYB subtractive mixing — restored" />
              </div>
            </div>
          </section>

          {/* Grey */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Grey</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2 flex gap-2">
                <Thumbnail src="/assets/theory/grey-warm.png" alt="Warm grey — mixed with yellow" />
                <Thumbnail src="/assets/theory/grey-cool.png" alt="Cool grey — mixed with blue" />
                <Thumbnail src="/assets/theory/grey-html-colors.png" alt="HTML color names for grey shades with hex triplets" />
              </span>
              <strong>Warm grey</strong> is mixed with yellow, while <strong>cool grey</strong> is mixed with blue. The distinction between warm and cool greys is important in painting, design, and color theory, as it affects the mood and temperature of a composition.
              <br /><br />
              <a href="https://en.wikipedia.org/wiki/Grey" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Grey →
              </a>
            </div>
          </section>

          {/* Harmony (Color) */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Harmony (Color)</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2 flex gap-2">
                <Thumbnail src="/assets/theory/harmony-ryb-wheel.png" alt="The traditional RYB color wheel, often used for selecting harmonious colors in art" />
                <Thumbnail src="/assets/theory/harmony-rgb-wheel.png" alt="The RGB color wheel, matching most technological processes" />
                <Thumbnail src="/assets/theory/harmony-munsell-hue-circle.png" alt="Munsell hue circle with complementary color connections" />
              </span>
              <p className="mb-3">
                In color theory, <strong>color harmony</strong> is a property of certain aesthetically pleasing color combinations. These combinations create pleasing contrasts and consonances that are said to be harmonious. These combinations can be of complementary colors, split-complementary colors, color triads, or analogous colors.
              </p>
              <p className="mb-3">
                Color harmony has been a topic of extensive study throughout history, but only since the Renaissance and the Scientific Revolution has it seen extensive codification. Artists and designers make use of these harmonies in order to achieve certain moods or aesthetics.
              </p>
              <a href="https://en.wikipedia.org/wiki/Harmony_(color)" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Harmony (color) →
              </a>
            </div>
          </section>

          {/* Color Scheme */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Color Scheme</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p className="mb-3">
                In color theory, a <strong>color scheme</strong> is a combination of 2 or more colors used in aesthetic or practical design. Aesthetic color schemes are used to create style and appeal. Colors that create a harmonious feeling when viewed together are often used together in aesthetic color schemes.
              </p>
              <p className="mb-3">
                Practical color schemes are used to inhibit or facilitate color tasks, such as camouflage color schemes or high visibility color schemes. Qualitative and quantitative color schemes are used to encode unordered categorical data and ordered data, respectively. Color schemes are often described in terms of logical combinations of colors on a color wheel or within a color space.
              </p>
              <a href="https://en.wikipedia.org/wiki/Color_scheme" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Color scheme →
              </a>
            </div>
          </section>

          {/* Color Wheel */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Color Wheel</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <div className="flex flex-wrap gap-2 mb-4">
                <Thumbnail src="/assets/theory/color-wheel-14.png" alt="Gradient RGB/CMY color wheel" />
                <Thumbnail src="/assets/theory/color-wheel-15.png" alt="Boutet's color wheel, 1708" />
                <Thumbnail src="/assets/theory/color-wheel-16.png" alt="Von Bezold's Farbenlehre color wheels" />
                <Thumbnail src="/assets/theory/color-wheel-17.png" alt="HSV color circle with HTML color names" />
                <Thumbnail src="/assets/theory/color-wheel-18.png" alt="Visible spectrum wavelength, frequency, and photon energy table" />
                <Thumbnail src="/assets/theory/color-wheel-19.png" alt="Die Blühenden Farben — historical color wheel" />
                <Thumbnail src="/assets/theory/color-wheel-20.png" alt="Harris's Prismatic color wheel" />
                <Thumbnail src="/assets/theory/color-wheel-21.png" alt="RGB color wheel with hex values" />
                <Thumbnail src="/assets/theory/color-wheel-22.png" alt="RYB primary, secondary, and tertiary colors" />
                <Thumbnail src="/assets/theory/color-wheel-23.png" alt="HSV color wheel with white center" />
              </div>
              A <strong>color wheel</strong> or color circle is an abstract illustrative organization of color hues around a circle, which shows the relationships between primary colors, secondary colors, tertiary colors etc.
              <br /><br />
              <a href="https://en.wikipedia.org/wiki/Color_wheel" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Color wheel →
              </a>
            </div>
          </section>

          {/* Color Space */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Color Space</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2 flex gap-2">
                <Thumbnail src="/assets/theory/color-space-gamuts-cie.png" alt="CIE chromaticity diagram comparing color space gamuts: ProPhoto RGB, Adobe RGB, sRGB, SWOP CMYK" />
                <Thumbnail src="/assets/theory/color-space-gamuts-3d.png" alt="3D comparison of color space gamuts: ProPhoto RGB, Adobe RGB, sRGB, and printer gamut" />
              </span>
              <p className="mb-3">
                A <strong>color space</strong> is a specific organization of colors. In combination with color profiling supported by various physical devices, it supports reproducible representations of color — whether such representation entails an analog or a digital representation.
              </p>
              <p className="mb-3">
                A color space may be arbitrary, with physically realized colors assigned to a set of physical color swatches with corresponding assigned color names (including discrete numbers in the Pantone collection), or structured with mathematical rigor (as with the NCS System, Adobe RGB and sRGB). A "color space" is a useful conceptual tool for understanding the color capabilities of a particular device or digital file. When trying to reproduce color on another device, color spaces can show whether shadow/highlight detail and color saturation can be retained, and by how much either will be compromised.
              </p>
              <a href="https://en.wikipedia.org/wiki/Color_space" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Color space →
              </a>
            </div>
          </section>

          {/* Color Model */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Color Model</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              In color science, a <strong>color model</strong> is an abstract mathematical model describing the way colors can be represented as tuples of numbers, typically as three or four values or color components. It differs from a <strong>color space</strong> in that a color model is not absolute, that is, there is no way to map a color within a color model to a point in a color space.
              <br /><br />
              <a href="https://en.wikipedia.org/wiki/Color_model" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Color model →
              </a>
            </div>
          </section>

          {/* Color Science */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Color Science</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/color-science-rgb-cmy-wheel.png" alt="Gradient RGB/CMY color wheel" />
              </span>
              <strong>Color science</strong> is the scientific study of color including lighting and optics; measurement of light and color; the physiology, psychophysics, and modeling of color vision; and color reproduction. It is the modern extension of traditional color theory.
              <br /><br />
              <a href="https://en.wikipedia.org/wiki/Color_theory" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Color theory →
              </a>
            </div>
          </section>

          {/* Primary Colors */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Primary Colors</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/primary-secondary-tertiary-ryb.png" alt="Primary, secondary, and tertiary colors of the RYB color model" />
              </span>
              <p className="mb-3">
                Color theory asserts three pure <strong>primary colors</strong> that can be used to mix all possible colors. These are sometimes considered as red, yellow and blue (RYB) or as red, green and blue (RGB). Ostensibly, any failure of specific paints or inks to match this ideal performance is due to the impurity or imperfection of the colorants.
              </p>
              <p className="mb-3">
                In contrast, modern color science does not recognize universal primary colors (no finite combination of colors can produce all other colors) and only uses primary colors to define a given color space. Any three primary colors can mix only a limited range of colors, called a <strong>gamut</strong>, which is always smaller (contains fewer colors) than the full range of colors humans can perceive. Primary colors also can't be made from other colors as they are inherently pure and distinct.
              </p>
              <a href="https://en.wikipedia.org/wiki/Color_theory#Primary_colors" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Color theory — Primary colors →
              </a>
            </div>
          </section>

          {/* Traditional RYB Primary Colors */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Traditional Red, Yellow, and Blue Primary Colors</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2 flex gap-2">
                <Thumbnail src="/assets/theory/primary-color-mixing-guide-1925.png" alt="Color Mixing Guide, John L. King 1925, cover and plates describing yellow, red, and blue color mixing" />
                <Thumbnail src="/assets/theory/primary-color-itten-wheel.png" alt="Johannes Itten's color wheel showing red, yellow, and blue as primary colors" />
              </span>
              Traditional red, yellow, and blue primary colors as a subtractive system. The RYB model is a historical set of colors used in subtractive color mixing, predating modern color science. It was the basis for color theory as taught in art schools for centuries.
              <br /><br />
              <a href="https://en.wikipedia.org/wiki/Primary_color#Traditional_red,_yellow,_and_blue_primary_colors_as_a_subtractive_system" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Primary color — Traditional RYB →
              </a>
            </div>
          </section>

          {/* Color Theory */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Color Theory</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/color-theory-goethe-wheel.png" alt="Goethe's color wheel from Theory of Colours" />
              </span>
              <strong>Color theory</strong>, or more specifically traditional color theory, is a historical body of knowledge describing the behavior of colors — namely in color mixing, color contrast effects, color harmony, color schemes and color symbolism. Modern color theory is generally referred to as <strong>color science</strong>. While they both study color and its existence, "traditional" color theory tends to be more subjective and have artistic applications, while color science tends to be more objective and have functional applications, such as in chemistry, astronomy or color reproduction. However, there is much intertwining between the two throughout history, and they tend to aid each other in their own evolutions.
              <br /><br />
              <a href="https://en.wikipedia.org/wiki/Color_theory" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Color theory →
              </a>
            </div>
          </section>

          {/* Munsell Color System */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Munsell Color System</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/munsell-3d-renotations.png" alt="Three-dimensional representation of the 1943 Munsell renotations" />
              </span>
              <p className="mb-3">
                The <strong>Munsell color system</strong> is a color space created by <strong>Albert H. Munsell</strong> in the early 1900s that specifies colors based on three perceptually uniform and independent dimensions: <strong>hue</strong> (basic color), <strong>value</strong> (lightness), and <strong>chroma</strong> (color intensity). It was the first system to separate these three properties systematically in three-dimensional space, grounded in rigorous measurements of human visual perception.
              </p>
              <p className="mb-3">
                Adopted by the USDA as the official color system for soil research in the 1930s, it has outlasted many contemporary color models and remains in wide use today, even alongside newer systems like CIELAB and CIECAM02.
              </p>
              <a href="https://en.wikipedia.org/wiki/Munsell_color_system" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Munsell color system →
              </a>
            </div>
          </section>

          {/* Natural Color System */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Natural Colour System (NCS)</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/ncs-elementary-colors.png" alt="NCS elementary colors: white–black, green–red, yellow–blue" />
              </span>
              The <strong>Natural Colour System (NCS)</strong> is a proprietary perceptual color model. It is based on the color opponency hypothesis of color vision, first proposed by German physiologist <strong>Ewald Hering</strong>. The NCS color model is based on the three pairs of elementary colors (white–black, green–red, and yellow–blue), as defined by color opponency.
              <br /><br />
              <a href="https://en.wikipedia.org/wiki/Natural_Color_System" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Natural Color System →
              </a>
            </div>
          </section>

          {/* Color Mixing */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Color Mixing</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2 flex gap-2">
                <Thumbnail src="/assets/theory/color-mixing-additive-rgb.png" alt="Additive color mixing in the RGB model" />
                <Thumbnail src="/assets/theory/color-mixing-subtractive-cmy.png" alt="Subtractive color mixing in the CMY model" />
              </span>
              <p className="mb-3">
                <strong>Additive mixing (RGB):</strong> The primaries red, green, and blue combine pairwise to produce the additive secondaries cyan, magenta, and yellow. Combining all three primaries produces white.
              </p>
              <p className="mb-3">
                <strong>Subtractive mixing (CMY):</strong> The primaries cyan, magenta and yellow combine pairwise to produce subtractive secondaries red, green, and blue. Combining all three primaries absorbs all light and produces black. In practical CMY color models, the center is usually dark gray and a separate black pigment is required to produce black (CMYK model).
              </p>
              <a href="https://en.wikipedia.org/wiki/Color_mixing" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Color mixing →
              </a>
            </div>
          </section>

          {/* Pastel Colors */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Pastel Colors</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p className="mb-3">
                <strong>Pastels</strong> or pastel colors belong to a pale family of colors, which, when described in the HSV color space, have <strong>high value and low or medium saturation</strong>. They are named after the artistic medium made from pigment and solid binding agents, similar to crayons. Pastel sticks historically had lower saturation than paints of the same pigment, hence the name of this color family.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {['Pink', 'Mauve', 'Baby Blue', 'Mint Green', 'Peach', 'Periwinkle', 'Lilac', 'Lavender'].map(c => (
                  <span key={c} className="px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded text-xs text-stone-600 dark:text-stone-300">{c}</span>
                ))}
              </div>
              <a href="https://en.wikipedia.org/wiki/Pastel_(color)" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Pastel (color) →
              </a>
            </div>
          </section>

          {/* Earth Tone */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Earth Tone</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p className="mb-3">
                <strong>Earth tone</strong> is a term used to describe a palette of colors that are similar to natural materials and landscapes. These colors are inspired by the earth's natural hues, including browns, greens, grays, and other warm and muted shades.
              </p>
              <p className="mb-3">
                Earth tones were popular in the 1970s and early 1980s during the environmental movement, as people sought to reconnect with nature and embrace more natural and organic lifestyles. In the mid-late 1980s, earth tones were supplanted by the neon pastels of <strong>Memphis Design</strong>.
              </p>
              <a href="https://en.wikipedia.org/wiki/Earth_tone" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Earth tone →
              </a>
            </div>
          </section>

          {/* Luxury Dyestuffs */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Luxury Dyestuffs</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <div className="flex flex-wrap gap-2 mb-3">
                {['Royal purple', 'Crimson and scarlet', 'The rise of formal black'].map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded text-xs text-stone-600 dark:text-stone-300">{tag}</span>
                ))}
              </div>
              <a href="https://en.wikipedia.org/wiki/Natural_dye#Luxury_dyestuffs" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Luxury dyestuffs →
              </a>
            </div>
          </section>

          {/* Common Dyestuffs */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Common Dyestuffs</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <div className="flex flex-wrap gap-2 mb-3">
                {['Reds and pinks', 'Technique', 'Oranges', 'Yellows', 'Greens', 'Blues', 'Indigo dyeing', 'Purples', 'Browns', 'Grays and blacks', 'Lichen', 'Fungi'].map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded text-xs text-stone-600 dark:text-stone-300">{tag}</span>
                ))}
              </div>
              <a href="https://en.wikipedia.org/wiki/Natural_dye#Common_dyestuffs" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Common dyestuffs →
              </a>
            </div>
          </section>

          {/* Origins of Natural Dyes */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Origins of Natural Dyes</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p className="mb-3">
                Colors in the "ruddy" range of reds, browns, and oranges are the first attested colors in a number of ancient textile sites ranging from the Neolithic to the Bronze Age across the Levant, Egypt, Mesopotamia and Europe, followed by evidence of blues and then yellows, with green appearing somewhat later.
              </p>
              <p className="mb-3">
                The earliest surviving evidence of textile dyeing was found at the large Neolithic settlement at <strong>Çatalhöyük</strong> in southern Anatolia, where traces of red dyes, possible from ochre (iron oxide pigments from clay), were found. Polychrome or multicolored fabrics seem to have been developed in the 3rd or 2nd millennium BCE. Textiles with a "red-brown warp and an ochre-yellow weft" were discovered in Egyptian pyramids of the Sixth Dynasty (2345–2180 BCE).
              </p>
              <p className="mb-3">
                The chemical analysis that would definitively identify the dyes used in ancient textiles has rarely been conducted, and even when a dye such as indigo blue is detected it is impossible to determine which of several indigo-bearing plants was used. Nevertheless, based on the colors of surviving textile fragments and the evidence of actual dyestuffs found in archaeological sites, reds, blues, and yellows from plant sources were in common use by the late Bronze Age and Iron Age.
              </p>
              <p className="mb-3">
                In the 18th century <strong>Jeremias Friedrich Gülich</strong> made substantial contributions to refining the dyeing process, making particular progress on setting standards on dyeing sheep wool and many other textiles. His contributions to refining the dyeing process and his theories on color brought much praise by the well known poet and artist <strong>Johann Wolfgang von Goethe</strong>.
              </p>
              <a href="https://en.wikipedia.org/wiki/Natural_dye#Origins" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Natural dye — Origins →
              </a>
            </div>
          </section>

          {/* Natural Dye */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Natural Dye</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/natural-dye-madder.png" alt="Naturally dyed skeins made with madder root, Colonial Williamsburg" />
              </span>
              <strong>Natural dyes</strong> are dyes or colorants derived from plants, invertebrates, or minerals. The majority of natural dyes are vegetable dyes from plant sources — roots, berries, bark, leaves, and wood — and other biological sources such as fungi.
              <br /><br />
              <strong>Animal-derived:</strong> Cochineal insect (red), Cow urine (Indian yellow), Lac insect (red, violet), Murex snail (purple, indigo blue), Octopus/Cuttlefish (sepia brown).
              <br /><br />
              <strong>Plant-derived:</strong> Black walnut hulls (brown, black), Catechu tree (brown), Gamboge resin (dark mustard yellow), Chestnut hulls (peach to brown), Ebony leaves (black)...
              <br /><br />
              <a href="https://en.wikipedia.org/wiki/Natural_dye" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Natural dye →
              </a>
            </div>
          </section>

          {/* Dye */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Dye</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/dye-medieval.png" alt="Medieval dyers at work" />
              </span>
              A <strong>dye</strong> is a colored substance that is soluble in some solvent; by contrast <strong>pigments</strong> are insoluble or nearly so in all solvents.
              Because of their solubility, dyes can chemically bind to the material they color.
              Dye is generally applied in an aqueous solution and may require a <strong>mordant</strong> to improve the fastness of the dye on the fiber.
              <br /><br />
              <a href="https://en.wikipedia.org/wiki/Dye" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Dye →
              </a>
            </div>
          </section>

          {/* Pigment */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Pigment</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2 flex gap-2">
                <Thumbnail src="/assets/theory/pigment-powders.png" alt="Colorful pigment powders" />
                <Thumbnail src="/assets/theory/pigment-light-absorption.png" alt="How pigments absorb and reflect light" />
                <Thumbnail src="/assets/theory/pigment-ultramarine.png" alt="Natural ultramarine pigment" />
                <Thumbnail src="/assets/theory/pigment-ultramarine-synthetic.png" alt="Synthetic ultramarine pigment" />
              </span>
              A pigment is a material that changes the color of reflected or transmitted light as the result of wavelength-selective absorption.
              Pigments differ from fluorescence and luminescence — they don't emit light, they selectively absorb certain wavelengths and reflect the rest.
              Many materials selectively absorb certain wavelengths of light. The materials that humans have chosen to produce as pigments usually have special properties that make them useful for coloring other materials.
              <br /><br />
              <a href="https://en.wikipedia.org/wiki/Pigment" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Pigment →
              </a>
            </div>
          </section>

          {/* Tints, Shades, Tones */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Tints, Shades, and Tones</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/tint-shade-tone.png" alt="Painters' color mixing terminology: tints, shades, and tones" />
              </span>
              Painters long mixed colors by combining relatively bright pigments with black and white.
              Mixtures with white are called <strong>tints</strong>, mixtures with black are called <strong>shades</strong>,
              and mixtures with both are called <strong>tones</strong>.
              <br />
              <a href="https://en.wikipedia.org/wiki/HSL_and_HSV#Motivation" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: HSL and HSV — Motivation →
              </a>
              <br />
              <a href="https://en.wikipedia.org/wiki/Tint,_shade_and_tone" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Wikipedia: Tint, shade and tone →
              </a>
            </div>
          </section>

          {/* HSL and HSV */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">HSL and HSV</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="float-left mr-4 mb-2">
                <Thumbnail src="/assets/theory/hsl-hsv-comparison.svg" alt="HSL and HSV color models comparison" />
              </span>
              <strong>HSL</strong> stands for hue, saturation, and lightness, and is often also called HLS.{' '}
              <strong>HSV</strong> stands for hue, saturation, and value, and is also often called HSB (B for brightness).{' '}
              A third model, common in computer vision applications, is <strong>HSI</strong>, for hue, saturation, and intensity.
              <br />
              <a
                href="https://en.wikipedia.org/wiki/HSL_and_HSV"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Wikipedia: HSL and HSV →
              </a>
            </div>
          </section>

          {/* Color Systems Used in Fashion */}
          <section className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Color Systems Used in Fashion</h3>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p className="mb-3">
                <strong>Pantone TCX (Textile Cotton eXtended):</strong> The industry standard for matching fabric color exactly between designer, factory, and supplier — physical swatch cards on 100% cotton poplin (not paper), so the color reads as it will on real fabric. Codes like "Mimosa (14-0848)" come from this system.
              </p>
              <p className="mb-3">
                <strong>Personal Color Analysis (seasonal color analysis):</strong> Matches clothing colors to an individual's skin tone, eye color, and hair color, sorting people into Winter/Spring/Summer/Autumn types (and 12-season sub-variants). About what suits a specific person, not about specifying the fabric color itself.
              </p>
              <p className="mb-3">
                <strong>Capsule wardrobe base + accent rule:</strong> A practical styling heuristic rather than a formal system — pick 2–3 neutral base colors (navy, grey, beige, white) plus 1–2 accent colors, so every piece mixes and matches with every other piece.
              </p>
              <p className="mb-3">
                <strong>NCS (Natural Colour System):</strong> Occasionally used in European textile and interior contexts, less dominant than Pantone. See the NCS entry above.
              </p>
              <a href="https://www.pantone.com/products/fashion-home-interiors/cotton-swatch-card" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block">
                Pantone: Cotton Swatch Card (TCX) →
              </a>
              <a href="https://en.wikipedia.org/wiki/Color_analysis" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block">
                Wikipedia: Color analysis →
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

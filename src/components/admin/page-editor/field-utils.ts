export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type FieldType =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'number'
  | 'boolean'
  | 'color'
  | 'image'
  | 'url'
  | 'icon'
  | 'object'
  | 'array'
  | 'countryCode'
  | 'topicSelect'
  | 'industrySelect'
  | 'formSelect'
  | 'ratingSelect'
  | 'null';

/** Fields editors should not change — heading level is fixed in the component. */
export function isHiddenCmsField(key: string, sectionType?: string, keyPath?: string): boolean {
  const lower = key.toLowerCase();
  if (lower === 'headingtag' || lower === 'titletag') return true;
  if (lower === 'overviewimages' || lower.startsWith('overviewimage')) return true;
  if ((sectionType === 'case-study-detail' || sectionType === 'case-study-detail-block') && key === 'bgColor') return true;

  if (sectionType === 'blog-detail-block') {
    if (
      key === 'type' ||
      key === 'id' ||
      key === 'authorName' ||
      key === 'authorAvatar' ||
      key === 'image' ||
      key === 'contentHtml' ||
      key === 'description' ||
      key === 'title'
    ) {
      return true;
    }
  }

  // Comment down/hide image and title fields for categories in AssFeaturesGrid section
  if (sectionType === 'ass-features-grid' && keyPath) {
    if (keyPath.includes('categories') && !keyPath.includes('items')) {
      if (lower === 'image' || lower === 'title') {
        return true;
      }
    }
  }

  return false;
}

/**
 * Semantic HTML tag used on the frontend for this text field (informational label only).
 */
export function getHeadingTagForField(
  key: string,
  sectionType?: string,
  keyPath?: string
): string | null {
  const lower = key.toLowerCase();
  const path = (keyPath || key).toLowerCase();

  if (
    lower.endsWith('color') ||
    lower.endsWith('url') ||
    lower.endsWith('link') ||
    lower.endsWith('href') ||
    lower.includes('image') ||
    lower.includes('formtype') ||
    lower === 'codetext' ||
    (lower.includes('bg') && lower !== 'badge') ||
    lower.includes('border')
  ) {
    return null;
  }

  const nestedInCard =
    /\b(cards?|items?|features?|modules?|slides?|stats?|links?|tabs?|services?|points?|products?|operations?)\b/.test(
      path
    ) && /\.\d+\./.test(path);

  if (
    lower === 'badgetext' ||
    lower === 'badge' ||
    lower === 'tag' ||
    lower === 'tagtext' ||
    lower === 'tag1text' ||
    lower === 'tag2text' ||
    lower === 'smalltitle'
  ) {
    return 'SPAN';
  }

  if (lower === 'subtitle' || lower === 'subheading' || lower === 'resultssubtitle') {
    return 'P';
  }

  if (
    lower === 'description' ||
    lower === 'descriptiontext' ||
    lower.endsWith('description') ||
    lower === 'abouttext'
  ) {
    return 'P';
  }

  const isHeroSection =
    !!sectionType &&
    (sectionType.includes('-hero') ||
      sectionType === 'hero' ||
      sectionType === 'not-found-hero' ||
      sectionType.endsWith('hero'));

  if (nestedInCard && (lower === 'title' || lower === 'name' || lower === 'label' || lower === 'heading')) {
    return 'H3';
  }

  if (
    lower === 'title' ||
    lower === 'titletext' ||
    lower === 'heading' ||
    lower === 'headingtext' ||
    lower === 'sectiontitle' ||
    lower === 'overviewtitle' ||
    lower === 'challengetitle' ||
    lower === 'solutionstitle' ||
    lower === 'resultstitle' ||
    lower === 'abouttitle' ||
    lower === 'whytitle' ||
    lower === 'formheader'
  ) {
    return isHeroSection ? 'H1' : 'H2';
  }

  if (
    lower === 'contenttitle' ||
    lower === 'tabtitle' ||
    lower === 'detailtitle' ||
    lower === 'lefttitle' ||
    lower === 'righttitle'
  ) {
    return 'H3';
  }

  if (lower === 'label' && !nestedInCard) {
    return 'H3';
  }

  return null;
}

function baseHumanLabel(key: string): string {
  if (key === 'headingH1') return 'Page H1';
  if (key === 'overviewTitle') return 'Title';
  if (key === 'overviewParagraphs') return 'Description';
  if (key === 'overviewImages') return 'Image Uploads';
  if (key === 'challengeTitle') return 'Title';
  if (key === 'challengeDescription') return 'Description';
  if (key === 'challengeImage') return 'Image Upload';
  if (key === 'solutionsTitle') return 'Title';
  if (key === 'solutionsDescription') return 'Description';
  if (key === 'solutionModules') return 'Items';
  if (key === 'icon') return 'Icon Upload';
  if (key === 'name') return 'Item Name';
  if (key === 'subtitle' || key === 'smallTitle') return 'Tag';
  if (key === 'resultsTitle') return 'Title';
  if (key === 'resultsSubtitle') return 'Subtitle';
  if (key === 'resultsItems') return 'Points';
  if (key === 'resultsCtaDescription') return 'CTA Description';
  if (key === 'bgImage') return 'Background Image';
  if (key === 'badgeBgColor') return 'Badge Background Color';
  if (key === 'badgeColor' || key === 'badgeTextColor') return 'Badge Text Color';
  if (key === 'badgeBorderColor') return 'Badge Border Color';
  if (key === 'titleColor') return 'Title Text Color';
  if (key === 'titleSecondaryColor') return 'Title Secondary Color (Highlights 4th, 5th, 7th words)';
  if (key === 'titleGradientFrom' || key === 'titleGradientStart') return 'Title Gradient Start Color';
  if (key === 'titleGradientTo' || key === 'titleGradientEnd') return 'Title Gradient End Color';
  if (key === 'gradientFrom') return 'Hero BG Gradient 1 (Start Color)';
  if (key === 'gradientVia') return 'Hero BG Gradient 2 (Middle Color)';
  if (key === 'gradientTo') return 'Hero BG Gradient 3 (End Color)';
  if (key === 'enableTitleGradientAnimation' || key === 'enableGradientAnimation' || key === 'animateTitleGradient') return 'Enable Title Gradient Animation';
  if (key === 'descriptionColor') return 'Description Text Color';
  if (key === 'button1Color') return 'Button 1 Text Color';
  if (key === 'button2Color') return 'Button 2 Text Color';
  if (key === 'bgColor') return 'Background Color';
  if (key === 'dateColor') return 'Date Color';
  if (key === 'contact') return 'Contact (Email/Phone No.)';
  if (key === 'qutation' || key === 'quotation') return 'Question';
  if (key === 'tag1BgColor') return 'Tag 1 Background Color';
  if (key === 'tag1TextColor') return 'Tag 1 Text Color';
  if (key === 'tag1Text') return 'Tag 1 Text';
  if (key === 'tag2BgColor') return 'Tag 2 Background Color';
  if (key === 'tag2TextColor') return 'Tag 2 Text Color';
  if (key === 'tag2Text') return 'Tag 2 Text';
  if (key === 'buttonArrowColor') return 'Button Arrow Color';
  if (key === 'titleText') return 'Title';
  if (key === 'titleTextColor') return 'Title Text Color';
  if (key === 'badgeText') return 'Badge';
  if (key === 'descriptionTextColor') return 'Description Text Color';
  if (key === 'aboutTitle') return 'About Title';
  if (key === 'aboutText') return 'About Text';
  if (key === 'formHeader') return 'Form Header';
  if (key === 'formSubheader') return 'Form Sub Header';
  if (key === 'badgeIcon') return 'Badge Icon Upload';
  if (key === 'button1BgColor') return 'Button 1 Background Color';
  if (key === 'button1BorderColor') return 'Button 1 Border Color';
  if (key === 'button1Text') return 'Button 1 Text';
  if (key === 'button1TextColor') return 'Button 1 Text Color';
  if (key === 'button1Url') return 'Button 1 URL';
  if (key === 'button2BgColor') return 'Button 2 Background Color';
  if (key === 'button2BorderColor') return 'Button 2 Border Color';
  if (key === 'button2Text') return 'Button 2 Text';
  if (key === 'button2TextColor') return 'Button 2 Text Color';
  if (key === 'button2Url') return 'Button 2 URL';
  if (key === 'mediaUrl') return 'Thumbnail Upload';
  if (key === 'videoUrl') return 'Media Upload';
  if (key === 'buttonBgColor') return 'Button Background Color';
  if (key === 'badge') return 'Badge';
  if (key === 'primaryTitleColor' || key === 'titlePrimaryColor') return 'Title Primary Color';
  if (key === 'secondaryTitleColor' || key === 'titleSecondaryColor') return 'Secondary Title Color';
  if (key === 'visionIcon') return 'Vision Icon Upload';
  if (key === 'visionTitle') return 'Vision Title';
  if (key === 'visionDescription') return 'Vision Description';
  if (key === 'visionPoints') return 'Vision Points';
  if (key === 'missionIcon') return 'Mission Icon Upload';
  if (key === 'missionTitle') return 'Mission Title';
  if (key === 'missionDescription') return 'Mission Description';
  if (key === 'missionPoints') return 'Mission Points';
  if (key === 'tabs') return 'Category Tabs List';
  if (key === 'label') return 'Title';
  if (key === 'number') return 'Value';
  if (key === 'contentTitle') return 'Detail Title';
  if (key === 'contentDescription') return 'Detail Description';
  if (key === 'contentImage') return 'Detail Mockup Image';
  if (key === 'benefits') return 'Benefits Tags (Array)';
  if (key === 'buttonText') return 'Button Text';
  if (key === 'buttonUrl') return 'CTA URL';
  if (key === 'documentUrl') return 'Document Upload';
  if (key === 'redirectUrl') return 'Redirection Link';
  if (key === 'buttonFormType') return 'Button Form Action';
  if (key === 'button1FormType') return 'Button 1 Form Action';
  if (key === 'button2FormType') return 'Button 2 Form Action';
  if (key === 'ctaFormType') return 'CTA Form Action';
  if (key === 'whatWeGet') return 'What You Get';
  if (key === 'mobileNumber') return 'Mobile Number';
  if (key === 'sectionTitle') return 'Section Title';
  if (key.toLowerCase().endsWith('pdfurl') || key.toLowerCase().endsWith('pdf')) {
    const prefix = key.replace(/PdfUrl$|pdfUrl$|Pdf$|pdf$/, '');
    if (!prefix || prefix.toLowerCase() === 'cta') return 'CTA PDF Upload';
    return (
      prefix
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_-]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()) + ' PDF Upload'
    );
  }
  if (key === 'tabTitle') return 'Tab Detail Title';

  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function humanLabel(
  key: string,
  options?: { sectionType?: string; keyPath?: string }
): string {
  if (options?.keyPath?.includes('challengePoints') || options?.keyPath?.includes('challenge_points')) {
    if (key === 'title') return 'Point Title';
    if (key === 'description') return 'Point Description';
  }

  if (options?.sectionType === 'sticky-card') {
    if (key === 'image') return 'Image Upload';
    if (key === 'title') return 'Title';
    if (key === 'description') return 'Description';
    if (key === 'buttonText') return 'Button Text';
    if (key === 'documentUrl') return 'Document Upload';
    if (key === 'redirectUrl') return 'Redirection Link';
  }

  if (options?.sectionType === 'landing1-challenges' && options?.keyPath?.includes('challenges.')) {
    if (key === 'title') return 'Challenge Title';
    if (key === 'desc') return 'Challenge Description';
    if (key === 'icon' || key === 'iconType' || key === 'image') return 'Icon / Image Upload';
    if (key === 'solution') return 'Solution Tag';
  }

  if (options?.sectionType === 'landing1-showcase') {
    if (key === 'name') return 'Tab Name';
    if (key === 'title') return 'Tab Title';
    if (key === 'desc') return 'Tab Description';
    if (key === 'primaryCtaText') return 'Tab CTA 1';
    if (key === 'primaryCtaUrl') return 'Tab CTA 1 URL';
    if (key === 'primaryCtaFormType') return 'Tab CTA 1 Form Action';
    if (key === 'secondaryCtaText') return 'Tab CTA 2';
    if (key === 'secondaryCtaUrl') return 'Tab CTA 2 URL';
    if (key === 'secondaryCtaFormType') return 'Tab CTA 2 Form Action';
    if (key === 'image' || key === 'videoUrl') return 'Video Upload';
  }

  if (options?.sectionType === 'landing2-carousel') {
    if (key === 'badge') return 'Tag';
    if (key === 'title') return 'Title';
    if (key === 'description') return 'Description';
    if (key === 'mediaUrl') return 'Thumbnail Upload';
    if (key === 'videoUrl') return 'Media Upload';
  }

  if (options?.sectionType === 'landing2-modules' && options?.keyPath?.includes('modules.')) {
    if (key === 'title') return 'Module Title';
    if (key === 'icon' || key === 'iconType' || key === 'image' || key === 'iconUrl') return 'Icon / Image Upload';
    if (key === 'href') return 'Link URL';
  }

  if (options?.sectionType === 'landing2-capabilities') {
    if (key === 'name' || key === 'tabName') return 'Tab Name';
    if (key === 'image') return 'Tab Dashboard Image Upload';
  }

  if (options?.sectionType === 'landing2-industries' && options?.keyPath?.includes('industries.')) {
    if (key === 'name' || key === 'title') return 'Industry Name';
    if (key === 'image') return 'Industry Tile Image Upload';
  }

  if (options?.sectionType === 'landing2-testimonials' && options?.keyPath?.includes('testimonials.')) {
    if (key === 'quote') return 'Title';
    if (key === 'author') return 'Name';
    if (key === 'role') return 'Role';
    if (key === 'image') return 'Thumbnail Image';
    if (key === 'videoUrl') return 'Video Upload';
  }

  if (options?.sectionType === 'blog-detail-block') {
    if (key === 'category') return 'Topic';
    if (key === 'heroBgImage') return 'Banner Image Upload';
    if (key === 'bgColor') return 'Hero Background Color';
    if (key === 'gradientFrom') return 'Hero BG Gradient 1';
    if (key === 'gradientVia') return 'Hero BG Gradient 2';
    if (key === 'gradientTo') return 'Hero BG Gradient 3';
    if (key === 'heroTitle') return 'Blog Title';
    if (key === 'date') return 'Published Date';
    if (key === 'readTime') return 'Time Estimation (e.g. 3min read)';
    if (key === 'authorCardAvatar') return 'Author Image Upload';
    if (key === 'authorCardName') return 'Author Name';
    if (key === 'authorCardRole') return 'Designation';
    if (key === 'authorCardBio') return 'Author Description';
    if (key === 'contentSegments') return 'Content Segments (Dynamic)';
    if (key === 'conclusionParagraphs') return 'Conclusion Descriptions';
    if (key === 'calcTitle') return 'Form Title';
    if (key === 'calcDisclaimer') return 'Form Disclaimer';
    if (key === 'calcPoints') return 'Form Points';
  }

  if (options?.sectionType === 'landing2-why-ess') {
    if (key === 'title') return 'Feature Title';
    if (key === 'description') return 'Feature Description';
    if (key === 'icon' || key === 'iconType' || key === 'image') return 'Icon / Image Upload';
  }

  if (options?.sectionType === 'landing2-footer-banner') {
    if (key === 'logo') return 'Company Logo Upload';
    if (key === 'navLinks') return 'Navigation Links Array';
    if (key === 'socialLinks') return 'Social Icons Array';
  }

  if (options?.sectionType === 'erp-features' && options?.keyPath?.includes('features.')) {
    if (key === 'title') return 'Tab Title';
    if (key === 'icon') return 'Tab Icon Upload';
    if (key === 'image') return 'Illustration / Mockup Image Upload';
    if (key === 'desc') return 'Description Line 1';
    if (key === 'desc2') return 'Description Line 2';
  }

  const base = baseHumanLabel(key);
  const tag = getHeadingTagForField(key, options?.sectionType, options?.keyPath);
  if (!tag) return base;
  if (base.includes(`(${tag})`)) return base;
  return `${base} (${tag})`;
}

const IMAGE_PATTERNS = ['image', 'thumbnail', 'avatar', 'logo', 'ogimage', 'photo', 'banner', 'icon_url', 'icon_image', 'icon', 'media', 'video', 'pdf'];
const URL_PATTERNS = ['url', 'href', 'link'];
const RICHTEXT_PATTERNS = ['description', 'desc', 'body', 'content', 'html', 'paragraph', 'text', 'summary', 'excerpt', 'answer', 'quote'];
const TEXTAREA_PATTERNS = ['subtitle', 'subheading', 'note', 'message'];
const COLOR_PATTERN = /^#([0-9a-f]{3}){1,2}$/i;
const ICON_PATTERNS = ['icon'];

export function detectFieldType(
  key: string,
  value: JsonValue,
  sectionType?: string
): FieldType {
  if (key === 'enableTitleGradientAnimation' || (key.startsWith('enable') && key.toLowerCase().includes('animation'))) return 'boolean';
  if (value === null || value === undefined) return 'null';
  if (key.toLowerCase() === 'rating') return 'ratingSelect';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';

  if (typeof value === 'string') {
    const lower = key.toLowerCase();

    if (lower === 'tabdesc') return 'text';
    if (sectionType === 'career-perks' || lower === 'perk' || lower === 'perks' || key.toLowerCase().includes('perk')) {
      if (lower === 'text' || lower === 'description' || lower === 'desc' || lower === 'name') {
        return 'textarea';
      }
    }
    if (sectionType?.startsWith('landing1-') && (lower === 'desc' || lower === 'description')) {
      return 'textarea';
    }
    if (lower === 'topic' || lower === 'category') return 'topicSelect';
    if (lower === 'industry' || lower === 'industries') return 'industrySelect';
    if (lower.endsWith('formtype')) return 'formSelect';
    if (lower === 'icon' && (sectionType === 'bi-business-impact' || sectionType === 'rpa-overview' || sectionType === 'rpa-capabilities' || sectionType === 'rpa-industries' || value.startsWith('/') || value.includes('.') || value.includes('://'))) return 'image';
    if (IMAGE_PATTERNS.some((p) => lower.includes(p)) && !lower.endsWith('alt')) return 'image';
    if (lower === 'color' || lower.endsWith('color') || lower.startsWith('color') || lower.includes('accent') || lower.startsWith('gradient')) {
      return 'color';
    }
    if (COLOR_PATTERN.test(value)) return 'color';
    if (URL_PATTERNS.some((p) => lower === p || lower.endsWith(p.charAt(0).toUpperCase() + p.slice(1)) || lower.endsWith('_' + p))) return 'url';
    if (ICON_PATTERNS.some((p) => lower === p) && value.length < 50) return 'icon';
    if (lower === 'countrycode' || lower === 'country_code') return 'countryCode';

    if (RICHTEXT_PATTERNS.some((p) => lower.includes(p))) return 'richtext';
    if (TEXTAREA_PATTERNS.some((p) => lower.includes(p))) return 'textarea';
    if (value.length > 120) return 'textarea';

    return 'text';
  }

  return 'text';
}

export function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const copy = structuredClone(obj);
  const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = copy;

  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const isIdx = /^\d+$/.test(k);
    if (isIdx) {
      current = current[Number(k)];
    } else {
      if (!(k in current) || typeof current[k] !== 'object' || current[k] === null) {
        current[k] = /^\d+$/.test(keys[i + 1] ?? '') ? [] : {};
      }
      current = current[k];
    }
  }

  const lastKey = keys[keys.length - 1];
  if (/^\d+$/.test(lastKey)) {
    current[Number(lastKey)] = value;
  } else {
    current[lastKey] = value;
  }

  return copy;
}

export function mergeSchemaWithContent(
  schema: Record<string, JsonValue> | undefined,
  content: Record<string, JsonValue>
): Record<string, JsonValue> {
  if (!schema) return content;

  const merged: Record<string, JsonValue> = {};
  const allKeys = new Set([...Object.keys(schema), ...Object.keys(content)]);

  for (const key of allKeys) {
    if (key in content) {
      merged[key] = content[key];
    } else if (key in schema) {
      merged[key] = schema[key];
    }
  }

  return merged;
}

export function createEmptyFromTemplate(template: JsonValue): JsonValue {
  if (template === null || template === undefined) return null;
  if (typeof template === 'string') return '';
  if (typeof template === 'number') return 0;
  if (typeof template === 'boolean') return false;
  if (Array.isArray(template)) return [];
  if (typeof template === 'object') {
    const obj: Record<string, JsonValue> = {};
    for (const [k, v] of Object.entries(template)) {
      obj[k] = createEmptyFromTemplate(v as JsonValue);
    }
    return obj;
  }
  return null;
}

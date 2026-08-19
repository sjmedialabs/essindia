import React from 'react';

interface FormattedTextProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content?: string | null;
  as?: React.ElementType;
  className?: string;
}

/**
 * FormattedText Component
 * 
 * Safely renders string or HTML content saved from CMS editors.
 * If the content contains HTML tags (e.g. <p>, <br>, <strong>, <a>, <ul>),
 * it renders via dangerouslySetInnerHTML. Otherwise, it renders as plain text.
 */
export function FormattedText({ content, as: Component = 'div', className, ...props }: FormattedTextProps) {
  if (!content) return null;

  // Unescape HTML entities if DB content contains encoded tags (e.g. &lt;p&gt; or &lt;strong&gt;)
  let rawStr = typeof content === 'string' ? content : '';
  if (rawStr.includes('&lt;') && rawStr.includes('&gt;')) {
    rawStr = rawStr
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }

  const isHtml = rawStr.includes('<') && rawStr.includes('>');

  if (isHtml) {
    return (
      <Component
        className={className}
        dangerouslySetInnerHTML={{ __html: rawStr }}
        {...props}
      />
    );
  }

  return (
    <Component className={className} {...props}>
      {rawStr}
    </Component>
  );
}

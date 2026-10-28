// ============================================================
// src/pages/admin/BlogEditor.tsx
// Superadmin Blog Creator & Editor powered by React Hook Form
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
  FormControl,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import TitleIcon from '@mui/icons-material/Title';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import {
  BLOG_CATEGORIES,
  createBlog,
  updateBlog,
  fetchBlogById,
  uploadBlogImage,
} from '../../services/blogApi';
import type { BlogFormData } from '../../services/blogApi';
import { ROUTE_PATHS } from '../../routes/paths';

export const BlogEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [loadingInitial, setLoadingInitial] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [slugLocked, setSlugLocked] = useState(true);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image: '',
      category: 'Lifecycle & Automation',
      tags: 'Klaviyo, Automation, Retention',
      author_name: 'AksharSync Specialist',
      author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      read_time: '5 min read',
      status: 'published',
      seo_title: '',
      seo_description: '',
    },
  });

  const watchedTitle = watch('title');
  const watchedContent = watch('content');
  const watchedCoverImage = watch('cover_image');

  // Slug generator helper
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Sync title to slug if unlocked
  useEffect(() => {
    if (!isEditMode && slugLocked && watchedTitle) {
      setValue('slug', slugify(watchedTitle));
    }
  }, [watchedTitle, slugLocked, isEditMode, setValue]);

  // Recalculate read-time based on word count
  useEffect(() => {
    if (watchedContent) {
      const words = watchedContent.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.ceil(words / 180));
      setValue('read_time', `${minutes} min read`);
    }
  }, [watchedContent, setValue]);

  // Load existing blog if in edit mode
  useEffect(() => {
    if (!isEditMode || !id) return;

    let isMounted = true;
    fetchBlogById(Number(id))
      .then((blog) => {
        if (!isMounted) return;
        setValue('title', blog.title);
        setValue('slug', blog.slug);
        setValue('excerpt', blog.excerpt || '');
        setValue('content', blog.content || '');
        setValue('cover_image', blog.cover_image || '');
        setValue('category', blog.category || 'Lifecycle & Automation');
        setValue('tags', blog.tags || '');
        setValue('author_name', blog.author_name || 'AksharSync Specialist');
        setValue('author_avatar', blog.author_avatar || '');
        setValue('read_time', blog.read_time || '5 min read');
        setValue('status', blog.status || 'published');
        setValue('seo_title', blog.seo_title || '');
        setValue('seo_description', blog.seo_description || '');
      })
      .catch((err) => {
        if (isMounted) setErrorMessage(err.message || 'Failed to load blog.');
      })
      .finally(() => {
        if (isMounted) setLoadingInitial(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, isEditMode, setValue]);

  // Image file upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMessage(null);
    console.log('[BlogEditor] User selected image file for upload:', {
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(1)} KB`,
      fileType: file.type,
    });

    try {
      const url = await uploadBlogImage(file);
      setValue('cover_image', url, { shouldDirty: true, shouldValidate: true });
      console.log(
        '[BlogEditor] Cover image attached successfully:',
        url.startsWith('data:') ? `Data URL preview (${url.slice(0, 30)}...)` : url
      );
    } catch (err: any) {
      console.error('[BlogEditor] Failed to upload image:', err);
      setErrorMessage(err.message || 'Failed to upload image.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Markdown Toolbar helper to insert text around selection
  const insertMarkdown = (syntaxBefore: string, syntaxAfter: string = '') => {
    const textarea = document.getElementById('blog-content-editor') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value;
    const selection = current.substring(start, end) || 'text';
    const replacement = `${syntaxBefore}${selection}${syntaxAfter}`;

    const updated = current.substring(0, start) + replacement + current.substring(end);
    setValue('content', updated, { shouldDirty: true });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + syntaxBefore.length, start + syntaxBefore.length + selection.length);
    }, 50);
  };

  // Form submission handler
  const onSubmit = async (data: BlogFormData) => {
    setSubmitting(true);
    setErrorMessage(null);
    console.log('[BlogEditor] Submitting blog to server MySQL database:', {
      action: isEditMode ? `UPDATE (ID: ${id})` : 'CREATE (New Blog)',
      title: data.title,
      slug: data.slug,
      category: data.category,
      status: data.status,
      hasCoverImage: Boolean(data.cover_image),
      coverImageType: data.cover_image?.startsWith('data:') ? 'Base64 Data URL' : 'URL path',
    });

    try {
      if (isEditMode && id) {
        await updateBlog(Number(id), data);
        console.log('[BlogEditor] ✅ Blog successfully updated in database!');
      } else {
        const created = await createBlog(data);
        console.log('[BlogEditor] ✅ Blog successfully created in database:', created);
      }
      navigate(ROUTE_PATHS.ADMIN_BLOGS);
    } catch (err: any) {
      console.error('[BlogEditor] ❌ Failed to save blog post:', err);
      setErrorMessage(err.message || 'Failed to save blog post.');
      setSubmitting(false);
    }
  };

  if (loadingInitial) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#060e1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#7fd0ff' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#060e1a', color: '#fff', py: 4, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="xl">
        {/* Top bar with back button & submit */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
            pb: 2,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={RouterLink}
              to={ROUTE_PATHS.ADMIN_BLOGS}
              startIcon={<ArrowBackIcon />}
              sx={{ color: 'rgba(255, 255, 255, 0.7)', textTransform: 'none', '&:hover': { color: '#7fd0ff' } }}
            >
              Back to Dashboard
            </Button>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {isEditMode ? 'Edit Article' : 'Write New Article'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(ROUTE_PATHS.ADMIN_BLOGS)}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                textTransform: 'none',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : <SaveIcon />}
              sx={{
                background: 'linear-gradient(135deg, #7fd0ff 0%, #472187 100%)',
                color: '#fff',
                fontWeight: 700,
                textTransform: 'none',
                px: 3,
                boxShadow: '0 8px 20px rgba(71, 33, 135, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #a78bfa 0%, #0D3B66 100%)',
                },
              }}
            >
              {submitting ? 'Saving Article...' : isEditMode ? 'Update Article' : 'Publish Article'}
            </Button>
          </Box>
        </Box>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 4, backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5' }}>
            {errorMessage}
          </Alert>
        )}

        {/* ── FORM GRID: MAIN CONTENT + SIDEBAR ── */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 380px' },
            gap: 4,
          }}
        >
          {/* LEFT COLUMN: TITLE, EXCERPT, RICH CONTENT EDITOR */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Title & Slug */}
            <Card sx={{ backgroundColor: 'rgba(8, 17, 33, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.85)', mb: 1, fontWeight: 700, fontSize: '0.95rem' }}>
                  Article Title *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. The Anatomy of a High-Converting Klaviyo Flow"
                  {...register('title', { required: 'Title is required' })}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(6, 14, 26, 0.8)',
                      borderRadius: 2,
                      color: '#fff',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                      '&:hover fieldset': { borderColor: 'rgba(127, 208, 255, 0.4)' },
                      '&.Mui-focused fieldset': { borderColor: '#7fd0ff' },
                    },
                  }}
                />

                {/* Slug with lock toggle */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem' }}>
                    Slug: https://aksharsync.com/blog/
                  </Typography>
                  <TextField
                    size="small"
                    disabled={slugLocked}
                    {...register('slug', { required: 'Slug is required' })}
                    sx={{
                      flex: 1,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: slugLocked ? 'rgba(255, 255, 255, 0.03)' : 'rgba(6, 14, 26, 0.8)',
                        borderRadius: 1.5,
                        color: '#7fd0ff',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                      },
                    }}
                  />
                  <Tooltip title={slugLocked ? 'Click to customize slug manually' : 'Slug unlocked'}>
                    <IconButton
                      size="small"
                      onClick={() => setSlugLocked(!slugLocked)}
                      sx={{ color: slugLocked ? 'rgba(255, 255, 255, 0.4)' : '#7fd0ff' }}
                    >
                      {slugLocked ? <LockIcon fontSize="small" /> : <LockOpenIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>

            {/* Excerpt Summary */}
            <Card sx={{ backgroundColor: 'rgba(8, 17, 33, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.85)', mb: 1, fontWeight: 700, fontSize: '0.95rem' }}>
                  Excerpt / Short Summary *
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Provide a compelling 1-2 sentence hook for search engines and social cards..."
                  {...register('excerpt', { required: 'Excerpt is required' })}
                  error={Boolean(errors.excerpt)}
                  helperText={errors.excerpt?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(6, 14, 26, 0.8)',
                      borderRadius: 2,
                      color: '#fff',
                      fontSize: '0.95rem',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                      '&:hover fieldset': { borderColor: 'rgba(127, 208, 255, 0.4)' },
                      '&.Mui-focused fieldset': { borderColor: '#7fd0ff' },
                    },
                  }}
                />
              </CardContent>
            </Card>

            {/* Content Editor with Toolbar & Preview Tab */}
            <Card sx={{ backgroundColor: 'rgba(8, 17, 33, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 3 }}>
              <Box sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 1 }}>
                <Tabs
                  value={activeTab}
                  onChange={(_, val) => setActiveTab(val)}
                  sx={{
                    minHeight: 'auto',
                    '& .MuiTabs-indicator': { backgroundColor: '#7fd0ff' },
                    '& .MuiTab-root': {
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.85rem',
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1,
                      '&.Mui-selected': { color: '#7fd0ff' },
                    },
                  }}
                >
                  <Tab value="write" label="Markdown Editor" />
                  <Tab value="preview" label="Live Preview" />
                </Tabs>

                {activeTab === 'write' && (
                  <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                    <Tooltip title="Heading 2">
                      <IconButton size="small" onClick={() => insertMarkdown('## ')} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        <TitleIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Bold">
                      <IconButton size="small" onClick={() => insertMarkdown('**', '**')} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        <FormatBoldIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Italic">
                      <IconButton size="small" onClick={() => insertMarkdown('*', '*')} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        <FormatItalicIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Bullet List">
                      <IconButton size="small" onClick={() => insertMarkdown('\n- ')} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        <FormatListBulletedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Code Block">
                      <IconButton size="small" onClick={() => insertMarkdown('\n```javascript\n', '\n```\n')} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        <CodeIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Quote Callout">
                      <IconButton size="small" onClick={() => insertMarkdown('\n> ')} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        <FormatQuoteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Link">
                      <IconButton size="small" onClick={() => insertMarkdown('[', '](https://)')} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        <InsertLinkIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Box>

              <CardContent sx={{ p: 3 }}>
                {activeTab === 'write' ? (
                  <TextField
                    id="blog-content-editor"
                    fullWidth
                    multiline
                    minRows={16}
                    placeholder="Write article in rich markdown or HTML... Use ## for headings, **bold**, `code`, etc."
                    {...register('content', { required: 'Content is required' })}
                    error={Boolean(errors.content)}
                    helperText={errors.content?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(6, 14, 26, 0.8)',
                        borderRadius: 2,
                        color: '#fff',
                        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                        '&:hover fieldset': { borderColor: 'rgba(127, 208, 255, 0.4)' },
                        '&.Mui-focused fieldset': { borderColor: '#7fd0ff' },
                      },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      minHeight: 380,
                      p: 3,
                      backgroundColor: 'rgba(6, 14, 26, 0.6)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      lineHeight: 1.8,
                    }}
                  >
                    {watchedContent ? (
                      <Box
                        sx={{
                          '& h2': { color: '#7fd0ff', mt: 3, mb: 1.5, fontSize: '1.4rem', fontWeight: 700 },
                          '& h3': { color: '#a78bfa', mt: 2.5, mb: 1, fontSize: '1.2rem', fontWeight: 600 },
                          '& p': { color: 'rgba(255, 255, 255, 0.85)', mb: 2 },
                          '& ul, & ol': { pl: 3, mb: 2, color: 'rgba(255, 255, 255, 0.85)' },
                          '& code': {
                            backgroundColor: 'rgba(127, 208, 255, 0.1)',
                            color: '#7fd0ff',
                            px: 1,
                            py: 0.3,
                            borderRadius: 1,
                            fontFamily: 'monospace',
                          },
                          '& pre': {
                            backgroundColor: '#030811',
                            p: 2,
                            borderRadius: 2,
                            overflowX: 'auto',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          },
                          '& blockquote': {
                            borderLeft: '4px solid #7fd0ff',
                            pl: 2,
                            my: 2,
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontStyle: 'italic',
                          },
                        }}
                      >
                        {watchedContent.split('\n\n').map((block, idx) => {
                          if (block.startsWith('## ')) {
                            return <h2 key={idx}>{block.replace('## ', '')}</h2>;
                          }
                          if (block.startsWith('### ')) {
                            return <h3 key={idx}>{block.replace('### ', '')}</h3>;
                          }
                          if (block.startsWith('> ')) {
                            return <blockquote key={idx}>{block.replace('> ', '')}</blockquote>;
                          }
                          return <p key={idx}>{block}</p>;
                        })}
                      </Box>
                    ) : (
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.4)', textAlign: 'center', py: 8 }}>
                        Nothing to preview yet. Switch back to the editor to write article content.
                      </Typography>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* SEO Metadata Accordion */}
            <Accordion
              sx={{
                backgroundColor: 'rgba(8, 17, 33, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px !important',
                color: '#fff',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#7fd0ff' }} />}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>SEO & Open Graph Metadata</Typography>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>
                    Configure search engine titles and meta descriptions
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1, pb: 3 }}>
                <Box>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 0.5, fontSize: '0.85rem' }}>
                    SEO Meta Title
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Defaults to article title if empty"
                    {...register('seo_title')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(6, 14, 26, 0.8)',
                        color: '#fff',
                        borderRadius: 2,
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 0.5, fontSize: '0.85rem' }}>
                    SEO Meta Description
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    size="small"
                    placeholder="Defaults to article excerpt if empty"
                    {...register('seo_description')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(6, 14, 26, 0.8)',
                        color: '#fff',
                        borderRadius: 2,
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                      },
                    }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* RIGHT COLUMN: PUBLISHING CONTROLS, COVER IMAGE, CATEGORY & AUTHOR */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Status & Publishing */}
            <Card sx={{ backgroundColor: 'rgba(8, 17, 33, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.85)', mb: 2, fontWeight: 700, fontSize: '0.95rem' }}>
                  Publication Status
                </Typography>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormControl component="fieldset">
                      <RadioGroup {...field} row>
                        <FormControlLabel
                          value="published"
                          control={<Radio sx={{ color: 'rgba(255,255,255,0.4)', '&.Mui-checked': { color: '#34d399' } }} />}
                          label={<Chip label="Published" size="small" sx={{ backgroundColor: 'rgba(52, 211, 153, 0.15)', color: '#34d399', fontWeight: 600 }} />}
                        />
                        <FormControlLabel
                          value="draft"
                          control={<Radio sx={{ color: 'rgba(255,255,255,0.4)', '&.Mui-checked': { color: '#fbbf24' } }} />}
                          label={<Chip label="Draft" size="small" sx={{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', fontWeight: 600 }} />}
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />

                <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem' }}>
                    Est. Read Time:
                  </Typography>
                  <TextField
                    size="small"
                    {...register('read_time')}
                    sx={{
                      width: 120,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(6, 14, 26, 0.8)',
                        color: '#7fd0ff',
                        borderRadius: 1.5,
                        fontSize: '0.85rem',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Featured Cover Image */}
            <Card sx={{ backgroundColor: 'rgba(8, 17, 33, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.85)', mb: 1, fontWeight: 700, fontSize: '0.95rem' }}>
                  Cover Image *
                </Typography>

                {watchedCoverImage ? (
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <Box
                      component="img"
                      src={watchedCoverImage}
                      alt="Cover Preview"
                      sx={{
                        width: '100%',
                        height: 180,
                        objectFit: 'cover',
                        borderRadius: 2,
                        border: '1px solid rgba(127, 208, 255, 0.3)',
                      }}
                    />
                    <IconButton
                      onClick={() => setValue('cover_image', '')}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: '#f87171',
                        '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.8)', color: '#fff' },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  <Box
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                      border: '2px dashed rgba(127, 208, 255, 0.3)',
                      borderRadius: 2,
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      mb: 2,
                      backgroundColor: 'rgba(6, 14, 26, 0.5)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#7fd0ff',
                        backgroundColor: 'rgba(127, 208, 255, 0.05)',
                      },
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: 36, color: '#7fd0ff', mb: 1 }} />
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem', fontWeight: 600 }}>
                      {uploadingImage ? 'Uploading Image...' : 'Click or Drag to Upload Cover'}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem', mt: 0.5 }}>
                      JPG, PNG, WebP or SVG (Max 8MB)
                    </Typography>
                  </Box>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />

                <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', mb: 0.5 }}>
                  Or Direct Image URL:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="https://images.unsplash.com/..."
                  {...register('cover_image', { required: 'Cover image is required' })}
                  error={Boolean(errors.cover_image)}
                  helperText={errors.cover_image?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(6, 14, 26, 0.8)',
                      color: '#fff',
                      borderRadius: 1.5,
                      fontSize: '0.85rem',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                    },
                  }}
                />
              </CardContent>
            </Card>

            {/* Category & Tags */}
            <Card sx={{ backgroundColor: 'rgba(8, 17, 33, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.85)', mb: 1, fontWeight: 700, fontSize: '0.95rem' }}>
                  Category & Classification *
                </Typography>

                <Controller
                  name="category"
                  control={control}
                  rules={{ required: 'Category is required' }}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      {...field}
                      sx={{
                        mb: 2.5,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(6, 14, 26, 0.8)',
                          color: '#fff',
                          borderRadius: 1.5,
                          '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                        },
                      }}
                    >
                      {BLOG_CATEGORIES.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 0.5, fontSize: '0.85rem' }}>
                  Tags (Comma separated)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Klaviyo, Liquid, Deliverability"
                  {...register('tags')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(6, 14, 26, 0.8)',
                      color: '#fff',
                      borderRadius: 1.5,
                      fontSize: '0.85rem',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                    },
                  }}
                />
              </CardContent>
            </Card>

            {/* Author Profile */}
            <Card sx={{ backgroundColor: 'rgba(8, 17, 33, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.85)', mb: 2, fontWeight: 700, fontSize: '0.95rem' }}>
                  Author Information
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 0.5, fontSize: '0.85rem' }}>
                    Author Name
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="AksharSync Specialist"
                    {...register('author_name', { required: 'Author name is required' })}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(6, 14, 26, 0.8)',
                        color: '#fff',
                        borderRadius: 1.5,
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 0.5, fontSize: '0.85rem' }}>
                    Author Avatar URL
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="https://..."
                    {...register('author_avatar')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(6, 14, 26, 0.8)',
                        color: '#fff',
                        borderRadius: 1.5,
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogEditor;

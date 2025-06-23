"use client";

// Artist Onboarding page with responsive form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Form validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  bio: yup.string().required('Bio is required'),
  category: yup.array().min(1, 'Select at least one category').required(),
  languages: yup.array().min(1, 'Select at least one language').required(),
  feeRange: yup.string().required('Fee range is required'),
  location: yup.string().required('Location is required'),
});

interface FormData {
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  feeRange: string;
  location: string;
}

export default function ArtistOnboarding() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Form setup with React Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      category: [],
      languages: [],
    },
  });

  // Form submission handler
  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Simulate API call
    alert('Artist onboarded successfully!');
  };

  // Filter options
  const categories = ['Singer', 'Dancer', 'Speaker', 'DJ'];
  const languages = ['English', 'Hindi', 'Kannada'];
  const feeRanges = ['₹20,000 - ₹50,000', '₹30,000 - ₹80,000', '₹50,000 - ₹1,00,000'];

  // Animation variants for page
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-lg sm:max-w-2xl"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Onboard Artist</h1>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        {/* Name field */}
        <div>
          <label htmlFor="name" className="block mb-1 text-sm sm:text-base">
            Name
          </label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        {/* Bio field */}
        <div>
          <label htmlFor="bio" className="block mb-1 text-sm sm:text-base">
            Bio
          </label>
          <Input id="bio" {...register('bio')} />
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
        </div>
        {/* Category multi-select */}
        <div>
          <label className="block mb-1 text-sm sm:text-base">Category</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center">
                    <Checkbox
                      id={`category-${cat}`}
                      checked={selectedCategories.includes(cat)}
                      onCheckedChange={(checked) => {
                        const newCategories = checked
                          ? [...selectedCategories, cat]
                          : selectedCategories.filter((c) => c !== cat);
                        setSelectedCategories(newCategories);
                        field.onChange(newCategories);
                      }}
                    />
                    <label htmlFor={`category-${cat}`} className="ml-2 text-sm sm:text-base">
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            )}
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
        {/* Languages multi-select */}
        <div>
          <label className="block mb-1 text-sm sm:text-base">Languages</label>
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang} className="flex items-center">
                    <Checkbox
                      id={`language-${lang}`}
                      checked={selectedLanguages.includes(lang)}
                      onCheckedChange={(checked) => {
                        const newLanguages = checked
                          ? [...selectedLanguages, lang]
                          : selectedLanguages.filter((l) => l !== lang);
                        setSelectedLanguages(newLanguages);
                        field.onChange(newLanguages);
                      }}
                    />
                    <label htmlFor={`language-${lang}`} className="ml-2 text-sm sm:text-base">
                      {lang}
                    </label>
                  </div>
                ))}
              </div>
            )}
          />
          {errors.languages && <p className="text-red-500 text-sm">{errors.languages.message}</p>}
        </div>
        {/* Fee range dropdown */}
        <div>
          <label className="block mb-1 text-sm sm:text-base">Fee Range</label>
          <Controller
            name="feeRange"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select fee range" />
                </SelectTrigger>
                <SelectContent>
                  {feeRanges.map((fee) => (
                    <SelectItem key={fee} value={fee}>
                      {fee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.feeRange && <p className="text-red-500 text-sm">{errors.feeRange.message}</p>}
        </div>
        {/* Location field */}
        <div>
          <label htmlFor="location" className="block mb-1 text-sm sm:text-base">
            Location
          </label>
          <Input id="location" {...register('location')} />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          Submit
        </Button>
      </form>
    </motion.div>
  );
}
"use client";

import { useForm, Controller, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ArtistContext } from '@/app/context/ArtistContext';

// Form validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  bio: yup.string().required('Bio is required'),
  category: yup.array().min(1, 'Select at least one category').required(),
  languages: yup.array().min(1, 'Select at least one language').required(),
  priceRange: yup.string().required('Price range is required'),
  location: yup.string().required('Location is required'),
  imageUrl: yup.string().url('Must be a valid URL').notRequired(),
});

interface FormData {
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  priceRange: string;
  location: string;
  imageUrl?: string;
}

export default function ArtistOnboarding() {
  const { addArtist } = useContext(ArtistContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    defaultValues: {
      name: '',
      bio: '',
      category: [],
      languages: [],
      priceRange: '',
      location: '',
      imageUrl: '',
    },
  });

  const onSubmit = (data: FormData) => {
    addArtist(data);
    console.log('Form submitted:', data);
    alert('Artist onboarded successfully!');
  };

  const categories = ['Singer', 'Dancer', 'Speaker', 'DJ'];
  const languages = ['English', 'Hindi', 'Kannada'];
  const priceRanges = ['₹20,000 - ₹50,000', '₹30,000 - ₹80,000', '₹50,000 - ₹1,00,000'];

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm sm:text-base">
            Name
          </label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="bio" className="block mb-1 text-sm sm:text-base">
            Bio
          </label>
          <Input id="bio" {...register('bio')} />
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
        </div>
        <div>
          <label htmlFor="imageUrl" className="block mb-1 text-sm sm:text-base">
            Image URL (Optional)
          </label>
          <Input id="imageUrl" {...register('imageUrl')} placeholder="e.g., https://example.com/image.jpg" />
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
        </div>
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
                      checked={field.value.includes(cat)}
                      onCheckedChange={(checked) => {
                        const newCategories = checked
                          ? [...field.value, cat]
                          : field.value.filter((c: string) => c !== cat);
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
                      checked={field.value.includes(lang)}
                      onCheckedChange={(checked) => {
                        const newLanguages = checked
                          ? [...field.value, lang]
                          : field.value.filter((l: string) => l !== lang);
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
        <div>
          <label className="block mb-1 text-sm sm:text-base">Price Range</label>
          <Controller
            name="priceRange"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((fee) => (
                    <SelectItem
                      className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md mx-1 my-0.5 px-3 py-1.5 transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      key={fee}
                      value={fee}
                    >
                      {fee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.priceRange && <p className="text-red-500 text-sm">{errors.priceRange.message}</p>}
        </div>
        <div>
          <label htmlFor="location" className="block mb-1 text-sm sm:text-base">
            Location
          </label>
          <Input id="location" {...register('location')} />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <Button type="submit" className="w-full sm:w-auto bg-gray-700 text-white hover:bg-gray-800 transition-colors duration-200">
          Submit
        </Button>
      </form>
    </motion.div>
  );
}
'use client';

import { useFilterContext } from '@/contexts/FilterContext';
import { Filter, Sliders, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TypographyH3, TypographyH4 } from '@/components/ui/typography';

import { PriceFilter } from '@/components/shared/PriceFilter';

export function FilterSidebar() {
  const {
    minPrice,
    maxPrice,
    sliderValues,
    minInput,
    maxInput,
    mobileSliderValues,
    mobileMinInput,
    mobileMaxInput,
    onMinInputChange,
    onMaxInputChange,
    onSliderChange,
    onMobileMinInputChange,
    onMobileMaxInputChange,
    onMobileSliderChange,
    applyMobileFilters,
    clearFilter: onClearFilter,
    clearMobileFilter,
    isFiltered,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useFilterContext();
  return (
    <>
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsSidebarOpen(true)}
          className="gap-2 w-full sm:w-auto text-sm bg-white shadow-sm hover:bg-primary hover:text-white transition-colors duration-300"
        >
          <Filter className="h-4 w-4" />
          Filter Products
          {isFiltered && (
            <span className="ml-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
              1
            </span>
          )}
        </Button>
      </div>
      <div className="hidden lg:block lg:w-80 flex-shrink-0">
        <div className="sticky top-6 space-y-6">
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <TypographyH3 className="font-semibold text-lg flex items-center gap-2">
                <Sliders className="h-5 w-5" /> Filter Products
              </TypographyH3>
              {isFiltered && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilter}
                  className="text-xs h-8 hover:text-primary"
                >
                  Clear All
                </Button>
              )}
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <TypographyH4 className="font-medium text-base">
                Price Range
              </TypographyH4>
              <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                sliderValues={sliderValues}
                minInput={minInput}
                maxInput={maxInput}
                onMinInputChange={onMinInputChange}
                onMaxInputChange={onMaxInputChange}
                onSliderChange={onSliderChange}
                onClearFilter={onClearFilter}
                isFiltered={isFiltered}
                isMobile={false}
                message="Auto-applying filter..."
              />
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <TypographyH3 className="text-lg font-semibold flex items-center gap-2">
                <Sliders className="h-5 w-5" /> Filter Products
              </TypographyH3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 space-y-5">
              <div>
                <TypographyH4 className="font-medium text-base mb-3">
                  Price Range
                </TypographyH4>
                <PriceFilter
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  sliderValues={mobileSliderValues}
                  minInput={mobileMinInput}
                  maxInput={mobileMaxInput}
                  onMinInputChange={onMobileMinInputChange}
                  onMaxInputChange={onMobileMaxInputChange}
                  onSliderChange={onMobileSliderChange}
                  onClearFilter={clearMobileFilter}
                  isFiltered={isFiltered}
                  isMobile={true}
                  message="Click Apply to see filtered results"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300"
                  onClick={clearMobileFilter}
                >
                  Reset
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={applyMobileFilters}
                >
                  Apply Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

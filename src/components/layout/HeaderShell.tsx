import { Header } from "./Header";
import { navigationTreeRepository } from "@/repositories/navigation-tree.repository";
import { mapNavigationTreeToNavItems } from "@/lib/cms/map-navigation-tree";
import { db } from "@/lib/db";
import { navigationMenus } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function HeaderShell() {
  try {
    let navTree = await navigationTreeRepository.getTreeByLocation('header-main');

    if (navTree.length === 0) {
      navTree = await navigationTreeRepository.getTreeByLocationFresh('header-main');
    }

    const megaMenus = await navigationTreeRepository.getMegaMenusByLocation('header-main');
    const navData = mapNavigationTreeToNavItems(navTree, megaMenus);

    const menuRecord = await db
      .select({
        logoUrl: navigationMenus.logoUrl,
        getStartedText: navigationMenus.getStartedText,
        getStartedLink: navigationMenus.getStartedLink,
        countryDropdownText: navigationMenus.countryDropdownText,
        countryLinks: navigationMenus.countryLinks,
      })
      .from(navigationMenus)
      .where(eq(navigationMenus.location, 'header-main'))
      .then((rows) => rows[0] || null)
      .catch(() => null);

    return (
      <Header
        navData={navData}
        logoUrl={menuRecord?.logoUrl ?? undefined}
        getStartedText={menuRecord?.getStartedText ?? undefined}
        getStartedLink={menuRecord?.getStartedLink ?? undefined}
        countryDropdownText={menuRecord?.countryDropdownText ?? undefined}
        countryLinks={(menuRecord?.countryLinks as any[]) ?? []}
      />
    );
  } catch (err) {
    console.error('[HeaderShell] Failed to load navigation menu from DB:', err);
    return <Header navData={[]} />;
  }
}
